import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  PenTool,
  Type,
  Trash2,
  Download,
  Sparkles,
  Paintbrush,
  Droplets,
  Minus,
  Plus,
  Palette,
  Save,
  Layers,
  Undo,
  Redo,
} from "lucide-react";

interface DrawingStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  size: number;
  tool: "pen" | "spray" | "marker";
  opacity: number;
}

interface Sticker {
  id: string;
  type: "drawing" | "text" | "emoji";
  content: string | DrawingStroke[];
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color?: string;
  font?: string;
  isCustom?: boolean;
}

interface SlapHistory {
  id: string;
  stickers: Sticker[];
  drawingStrokes: DrawingStroke[];
  timestamp: Date;
  hasCustomArt?: boolean;
  thumbnail?: string;
}

interface GraffitiSlapProps {
  onAchievement?: (achievement: {
    type: "graffiti_piece";
    title: string;
    description: string;
    data: any;
  }) => void;
}

const COLORS = [
  "#FF3B30", // Hot Red
  "#FF9500", // Orange
  "#FFCC00", // Yellow
  "#34C759", // Green
  "#007AFF", // Blue
  "#5856D6", // Purple
  "#FF2D92", // Pink
  "#8E8E93", // Gray
  "#000000", // Black
  "#FFFFFF", // White
];

const GRAFFITI_EMOJIS = [
  "🔥",
  "💯",
  "⚡",
  "💥",
  "🎯",
  "👑",
  "💎",
  "🚀",
  "🌟",
  "💫",
];

const BRUSH_TOOLS = [
  {
    id: "pen",
    name: "Pen",
    icon: PenTool,
    description: "Sharp lines",
  },
  {
    id: "marker",
    name: "Marker",
    icon: Paintbrush,
    description: "Bold strokes",
  },
  {
    id: "spray",
    name: "Spray",
    icon: Droplets,
    description: "Graffiti style",
  },
] as const;

const FONTS = [
  {
    name: "Wild",
    class:
      "font-black text-3xl tracking-wider transform -skew-x-12",
    style: "street wild style",
  },
  {
    name: "Block",
    class: "font-black text-2xl tracking-widest",
    style: "block letters",
  },
  {
    name: "Tag",
    class: "font-mono text-xl tracking-wide italic",
    style: "tag style",
  },
];

export function GraffitiSlap({
  onAchievement,
}: GraffitiSlapProps) {
  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thumbnailCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] =
    useState<DrawingStroke | null>(null);
  const [drawingStrokes, setDrawingStrokes] = useState<
    DrawingStroke[]
  >([]);
  const [undoStack, setUndoStack] = useState<DrawingStroke[][]>(
    [],
  );
  const [redoStack, setRedoStack] = useState<DrawingStroke[][]>(
    [],
  );

  // Tools and settings
  const [selectedTool, setSelectedTool] = useState<
    "pen" | "marker" | "spray"
  >("marker");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(8);
  const [selectedEmoji, setSelectedEmoji] = useState(
    GRAFFITI_EMOJIS[0],
  );
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  // UI state
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [slapHistory, setSlapHistory] = useState<SlapHistory[]>(
    [],
  );
  const [isSlapping, setIsSlapping] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [mode, setMode] = useState<"draw" | "place">("draw");

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set canvas style
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    redrawCanvas();
  }, [drawingStrokes]);

  // Initialize thumbnail canvas
  useEffect(() => {
    const canvas = thumbnailCanvasRef.current;
    if (!canvas) return;

    canvas.width = 120;
    canvas.height = 64;
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawingStrokes.forEach((stroke) => {
      drawStroke(ctx, stroke);
    });
  }, [drawingStrokes]);

  const drawStroke = (
    ctx: CanvasRenderingContext2D,
    stroke: DrawingStroke,
    scale: number = 1,
  ) => {
    if (stroke.points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size * scale;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = stroke.opacity;

    if (stroke.tool === "spray") {
      // Spray paint effect
      stroke.points.forEach((point, index) => {
        if (index === 0) return;

        const prevPoint = stroke.points[index - 1];
        const distance = Math.hypot(
          point.x - prevPoint.x,
          point.y - prevPoint.y,
        );
        const steps = Math.max(1, Math.floor(distance / 2));

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const x =
            (prevPoint.x + (point.x - prevPoint.x) * t) * scale;
          const y =
            (prevPoint.y + (point.y - prevPoint.y) * t) * scale;

          // Add spray particles
          const particleCount = Math.max(
            1,
            Math.floor(3 * scale),
          );
          for (let j = 0; j < particleCount; j++) {
            const offsetX =
              (Math.random() - 0.5) * stroke.size * scale;
            const offsetY =
              (Math.random() - 0.5) * stroke.size * scale;
            ctx.fillStyle = stroke.color;
            ctx.globalAlpha =
              stroke.opacity * (0.3 + Math.random() * 0.7);
            ctx.fillRect(
              x + offsetX,
              y + offsetY,
              Math.max(1, scale),
              Math.max(1, scale),
            );
          }
        }
      });
    } else if (stroke.tool === "marker") {
      // Thick marker effect
      ctx.lineWidth = stroke.size * 1.5 * scale;
      ctx.globalAlpha = stroke.opacity * 0.8;

      ctx.moveTo(
        stroke.points[0].x * scale,
        stroke.points[0].y * scale,
      );
      stroke.points.forEach((point) => {
        ctx.lineTo(point.x * scale, point.y * scale);
      });
      ctx.stroke();
    } else {
      // Regular pen
      ctx.moveTo(
        stroke.points[0].x * scale,
        stroke.points[0].y * scale,
      );
      stroke.points.forEach((point) => {
        ctx.lineTo(point.x * scale, point.y * scale);
      });
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  };

  const generateThumbnail = useCallback((): string => {
    const canvas = thumbnailCanvasRef.current;
    if (!canvas) return "";

    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Clear canvas with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw strokes at thumbnail scale
    const mainCanvas = canvasRef.current;
    if (mainCanvas) {
      const scaleX = canvas.width / mainCanvas.offsetWidth;
      const scaleY = canvas.height / mainCanvas.offsetHeight;
      const scale = Math.min(scaleX, scaleY);

      drawingStrokes.forEach((stroke) => {
        drawStroke(ctx, stroke, scale);
      });
    }

    // Draw stickers at thumbnail scale
    stickers.forEach((sticker) => {
      if (sticker.type === "emoji" || sticker.type === "text") {
        ctx.save();
        const x = (sticker.x / 100) * canvas.width;
        const y = (sticker.y / 100) * canvas.height;

        ctx.translate(x, y);
        ctx.rotate((sticker.rotation * Math.PI) / 180);
        ctx.scale(sticker.scale * 0.3, sticker.scale * 0.3);

        if (sticker.type === "emoji") {
          ctx.font = "16px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(sticker.content as string, 0, 0);
        } else if (sticker.type === "text") {
          ctx.font = "bold 8px Arial";
          ctx.fillStyle = sticker.color || "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(sticker.content as string, 0, 0);
        }

        ctx.restore();
      }
    });

    return canvas.toDataURL("image/png", 0.5);
  }, [drawingStrokes, stickers]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (mode !== "draw") return;

    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStroke: DrawingStroke = {
      id: Date.now().toString(),
      points: [{ x, y }],
      color: selectedColor,
      size: brushSize,
      tool: selectedTool,
      opacity: selectedTool === "spray" ? 0.7 : 1,
    };

    setCurrentStroke(newStroke);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || mode !== "draw") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, { x, y }],
    };

    setCurrentStroke(updatedStroke);

    // Draw immediately for responsiveness
    const ctx = canvas.getContext("2d");
    if (ctx && currentStroke.points.length > 0) {
      const lastPoint =
        currentStroke.points[currentStroke.points.length - 1];
      drawStroke(ctx, {
        ...updatedStroke,
        points: [lastPoint, { x, y }],
      });
    }
  };

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) return;

    setIsDrawing(false);

    // Save to undo stack
    setUndoStack((prev) => [...prev.slice(-9), drawingStrokes]); // Keep last 10
    setRedoStack([]);

    setDrawingStrokes((prev) => [...prev, currentStroke]);
    setCurrentStroke(null);
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const previousState = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, drawingStrokes]);
    setUndoStack((prev) => prev.slice(0, -1));
    setDrawingStrokes(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, drawingStrokes]);
    setRedoStack((prev) => prev.slice(0, -1));
    setDrawingStrokes(nextState);
  };

  const clearCanvas = () => {
    setUndoStack((prev) => [...prev, drawingStrokes]);
    setRedoStack([]);
    setDrawingStrokes([]);
    setStickers([]);
  };

  const saveDrawingAsSticker = () => {
    if (drawingStrokes.length === 0) return;

    const newSticker: Sticker = {
      id: Date.now().toString(),
      type: "drawing",
      content: [...drawingStrokes],
      x: 50,
      y: 50,
      rotation: Math.random() * 10 - 5,
      scale: 0.8 + Math.random() * 0.4,
      isCustom: true,
    };

    setStickers((prev) => [...prev, newSticker]);
    setDrawingStrokes([]);
    setUndoStack([]);
    setRedoStack([]);

    // Trigger celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);

    // Trigger achievement
    if (onAchievement) {
      onAchievement({
        type: "graffiti_piece",
        title: "Original Artwork",
        description: "Created and saved a custom drawing!",
        data: {
          type: "drawing",
          strokes: drawingStrokes.length,
        },
      });
    }
  };

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (mode !== "place" || isSlapping) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newSticker: Sticker = {
      id: Date.now().toString(),
      type: "emoji",
      content: selectedEmoji,
      x,
      y,
      rotation: Math.random() * 30 - 15,
      scale: 0.8 + Math.random() * 0.4,
      color: selectedColor,
    };

    setStickers((prev) => [...prev, newSticker]);
  };

  const applyText = () => {
    if (!textInput.trim()) return;

    const newSticker: Sticker = {
      id: Date.now().toString(),
      type: "text",
      content: textInput,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      rotation: Math.random() * 8 - 4,
      scale: 0.8 + Math.random() * 0.3,
      color: selectedColor,
      font: selectedFont.class,
    };

    setStickers((prev) => [...prev, newSticker]);
    setShowTextModal(false);
    setTextInput("");

    // Trigger achievement for text
    if (onAchievement && textInput.length >= 10) {
      onAchievement({
        type: "graffiti_piece",
        title: "Street Poet",
        description: "Added meaningful text to your piece!",
        data: { type: "text", content: textInput },
      });
    }
  };

  const slapAll = () => {
    if (
      isSlapping ||
      (stickers.length === 0 && drawingStrokes.length === 0)
    )
      return;

    setIsSlapping(true);

    const hasCustomArt =
      stickers.some((s) => s.isCustom) ||
      drawingStrokes.length > 0;
    const thumbnail = generateThumbnail();

    const newHistory: SlapHistory = {
      id: Date.now().toString(),
      stickers: [...stickers],
      drawingStrokes: [...drawingStrokes],
      timestamp: new Date(),
      hasCustomArt,
      thumbnail,
    };

    setSlapHistory((prev) => [newHistory, ...prev.slice(0, 7)]);

    // Trigger achievement for completing a piece
    if (onAchievement) {
      let title = "";
      let description = "";

      if (hasCustomArt && stickers.length > 0) {
        title = "Mixed Media Master";
        description =
          "Combined drawing and stickers in one piece!";
      } else if (hasCustomArt) {
        title = "Street Artist";
        description = "Completed an original artwork!";
      } else if (stickers.length >= 5) {
        title = "Sticker Bomber";
        description = "Used 5+ elements in one piece!";
      } else {
        title = "First Slap";
        description = "Completed your first graffiti piece!";
      }

      onAchievement({
        type: "graffiti_piece",
        title,
        description,
        data: {
          hasCustomArt,
          stickerCount: stickers.length,
          strokeCount: drawingStrokes.length,
        },
      });
    }

    setTimeout(() => {
      setStickers([]);
      setDrawingStrokes([]);
      setUndoStack([]);
      setRedoStack([]);
      setIsSlapping(false);
    }, 800);
  };

  const loadFromHistory = (history: SlapHistory) => {
    setStickers(history.stickers);
    setDrawingStrokes(history.drawingStrokes);
    setUndoStack([]);
    setRedoStack([]);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-6 relative overflow-hidden">
      {/* Hidden thumbnail canvas */}
      <canvas
        ref={thumbnailCanvasRef}
        className="hidden"
        width={120}
        height={64}
      />

      {/* Urban background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,_#ff6b6b_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_#4ecdc4_0%,_transparent_50%),radial-gradient(circle_at_40%_40%,_#45b7d1_0%,_transparent_50%)]"></div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -20,
                  x: Math.random() * 100 + "%",
                  rotate: 0,
                  scale: 0,
                }}
                animate={{
                  y: "120%",
                  rotate: 360,
                  scale: [0, 1, 0.8, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                className="absolute text-2xl"
              >
                {["🔥", "💯", "⚡", "💥", "🎨", "👑"][i % 6]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Modal */}
      <AnimatePresence>
        {showTextModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-40"
            onClick={() => setShowTextModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  Drop Your Tag
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTextModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Tag ({textInput.length}/15)
                  </label>
                  <motion.input
                    animate={{
                      boxShadow:
                        textInput.length >= 10
                          ? `0 0 20px ${selectedColor}40`
                          : "none",
                    }}
                    type="text"
                    value={textInput}
                    onChange={(e) =>
                      setTextInput(e.target.value.slice(0, 15))
                    }
                    placeholder="WILDSTYLE"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  />
                  {textInput.length >= 10 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-purple-400 mt-1 flex items-center gap-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      Street poet status unlocked!
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Style
                  </label>
                  <div className="space-y-2">
                    {FONTS.map((font) => (
                      <motion.button
                        key={font.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedFont(font)}
                        className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                          selectedFont.name === font.name
                            ? "border-purple-500 bg-purple-500/20"
                            : "border-slate-600 hover:border-purple-400 bg-slate-700/50"
                        }`}
                      >
                        <div
                          className={`${font.class} text-white`}
                          style={{ color: selectedColor }}
                        >
                          {font.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {font.style}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTextModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={applyText}
                  disabled={!textInput.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    textInput.trim()
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  💥 TAG IT
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <motion.h2
            animate={{
              textShadow:
                mode === "draw"
                  ? `0 0 20px ${selectedColor}80`
                  : "none",
            }}
            className="text-2xl font-black text-white tracking-wider"
          >
            GRAFFITI CREATOR
          </motion.h2>
          <motion.div
            animate={{
              rotate: isSlapping ? [0, -15, 15, -15, 15, 0] : 0,
              scale: isSlapping ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.8 }}
            className="text-2xl"
          >
            🎨
          </motion.div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2"
            disabled={
              drawingStrokes.length === 0 &&
              stickers.length === 0
            }
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={slapAll}
            disabled={
              (stickers.length === 0 &&
                drawingStrokes.length === 0) ||
              isSlapping
            }
            className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 ${
              (stickers.length === 0 &&
                drawingStrokes.length === 0) ||
              isSlapping
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg"
            }`}
          >
            {isSlapping ? "💥 SLAPPING..." : "🔥 SLAP ALL!"}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Enhanced Toolbar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Mode Toggle */}
          <div className="bg-slate-800/80 backdrop-blur p-4 rounded-lg border border-purple-500/30">
            <h3 className="font-bold text-white mb-3">Mode</h3>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("draw")}
                className={`p-3 rounded-lg font-medium transition-all ${
                  mode === "draw"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                ✏️ Draw
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("place")}
                className={`p-3 rounded-lg font-medium transition-all ${
                  mode === "place"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                🎯 Place
              </motion.button>
            </div>
          </div>

          {/* Drawing Tools */}
          {mode === "draw" && (
            <div className="bg-slate-800/80 backdrop-blur p-4 rounded-lg border border-purple-500/30">
              <h3 className="font-bold text-white mb-3">
                Tools
              </h3>
              <div className="space-y-2">
                {BRUSH_TOOLS.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <motion.button
                      key={tool.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedTool === tool.id
                          ? "bg-purple-600 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">
                          {tool.name}
                        </div>
                        <div className="text-xs opacity-75">
                          {tool.description}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Brush Size */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Size: {brushSize}px
                </label>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setBrushSize(Math.max(2, brushSize - 2))
                    }
                    className="p-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${(brushSize / 20) * 100}%`,
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setBrushSize(Math.min(20, brushSize + 2))
                    }
                    className="p-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  className="flex-1 p-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Undo className="w-4 h-4 mx-auto" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  className="flex-1 p-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Redo className="w-4 h-4 mx-auto" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveDrawingAsSticker}
                  disabled={drawingStrokes.length === 0}
                  className="flex-1 p-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mx-auto" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Placement Tools */}
          {mode === "place" && (
            <div className="bg-slate-800/80 backdrop-blur p-4 rounded-lg border border-purple-500/30">
              <h3 className="font-bold text-white mb-3">
                Stickers
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {GRAFFITI_EMOJIS.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedEmoji === emoji
                        ? "border-purple-500 bg-purple-500/20 shadow-md"
                        : "border-slate-600 hover:border-purple-400 hover:bg-purple-500/10"
                    }`}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTextModal(true)}
                className="w-full flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <Type className="w-5 h-5" />
                Add Text
              </motion.button>
            </div>
          )}

          {/* Color Picker */}
          <div className="bg-slate-800/80 backdrop-blur p-4 rounded-lg border border-purple-500/30">
            <h3 className="font-bold text-white mb-3">
              Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                    selectedColor === color
                      ? "border-white shadow-lg scale-110"
                      : "border-slate-600 hover:border-slate-400"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/80 backdrop-blur rounded-lg border border-purple-500/30 overflow-hidden">
            <div className="p-3 bg-slate-900/80 border-b border-purple-500/30 flex items-center justify-between">
              <span className="font-medium text-white">
                {mode === "draw"
                  ? "✏️ Drawing Canvas"
                  : "🎯 Sticker Canvas"}
              </span>
              <span className="text-sm text-gray-400">
                {mode === "draw"
                  ? `${drawingStrokes.length} strokes`
                  : `${stickers.length} stickers`}
              </span>
            </div>

            <div className="relative">
              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                className={`w-full h-96 ${mode === "draw" ? "cursor-crosshair" : "cursor-pointer"} bg-white`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onClick={
                  mode === "place"
                    ? handleCanvasClick
                    : undefined
                }
                style={{ touchAction: "none" }}
              />

              {/* Placed Stickers Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                  {stickers.map((sticker) => (
                    <motion.div
                      key={sticker.id}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{
                        scale: sticker.scale,
                        rotate: sticker.rotation,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`absolute pointer-events-none select-none ${
                        sticker.type === "text"
                          ? sticker.font
                          : ""
                      }`}
                      style={{
                        left: `${sticker.x}%`,
                        top: `${sticker.y}%`,
                        color: sticker.color,
                        transform: "translate(-50%, -50%)",
                        filter: sticker.isCustom
                          ? "drop-shadow(0 0 8px rgba(138, 43, 226, 0.6))"
                          : "drop-shadow(2px 2px 4px rgba(0,0,0,0.4))",
                        fontSize:
                          sticker.type === "text"
                            ? "1.2rem"
                            : "2rem",
                        zIndex: 10,
                      }}
                    >
                      {sticker.type === "drawing" ? (
                        <div className="w-20 h-20 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          🎨
                        </div>
                      ) : (
                        sticker.content
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty State */}
              {mode === "draw" &&
                drawingStrokes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-lg">
                        Start drawing your masterpiece!
                      </p>
                      <p className="text-sm opacity-75">
                        Choose a tool and color, then draw
                      </p>
                    </div>
                  </div>
                )}

              {mode === "place" && stickers.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-lg">
                      Click to place stickers!
                    </p>
                    <p className="text-sm opacity-75">
                      Choose a sticker or add text
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Gallery */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/80 backdrop-blur p-4 rounded-lg border border-purple-500/30">
            <h3 className="font-bold text-white mb-3">
              Street Gallery
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {slapHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <div className="text-3xl mb-2">🏛️</div>
                  <p className="text-sm">
                    Your pieces will appear here!
                  </p>
                </div>
              ) : (
                slapHistory.map((history) => (
                  <motion.div
                    key={history.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-slate-700/50 p-3 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                      history.hasCustomArt
                        ? "border-purple-400 bg-gradient-to-r from-purple-900/30 to-pink-900/30"
                        : "border-slate-600 hover:border-purple-500"
                    }`}
                    onClick={() => loadFromHistory(history)}
                  >
                    <div
                      className={`relative w-full h-16 bg-white rounded border overflow-hidden mb-2 ${
                        history.hasCustomArt
                          ? "border-purple-300"
                          : "border-gray-300"
                      }`}
                    >
                      {history.thumbnail ? (
                        <img
                          src={history.thumbnail}
                          alt="Artwork thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-2xl">🎨</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        {history.stickers.length +
                          history.drawingStrokes.length}{" "}
                        elements
                        {history.hasCustomArt && (
                          <span className="text-purple-400">
                            🔥
                          </span>
                        )}
                      </span>
                      <span>
                        {history.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}