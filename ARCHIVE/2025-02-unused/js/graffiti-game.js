// Graffiti/Slap Game Implementation
function initGraffitiGame() {
    console.log('💥 Initializing Graffiti Game...');
    
    const canvas = document.getElementById('graffiti-canvas');
    const brushSizeSlider = document.getElementById('brush-size');
    const brushColorPicker = document.getElementById('brush-color');
    const clearButton = document.getElementById('clear-canvas');
    const saveButton = document.getElementById('save-art');
    
    if (!canvas || !brushSizeSlider || !brushColorPicker || !clearButton || !saveButton) {
        console.error('❌ Graffiti game elements not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let brushSize = 5;
    let brushColor = '#00ff9d';
    
    // Set canvas background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
        if (!isDrawing) return;
        isDrawing = false;
        ctx.beginPath();
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Tool controls
    brushSizeSlider.addEventListener('input', (e) => {
        brushSize = e.target.value;
    });
    
    brushColorPicker.addEventListener('change', (e) => {
        brushColor = e.target.value;
    });
    
    clearButton.addEventListener('click', () => {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    saveButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'graffiti-art.png';
        link.href = canvas.toDataURL();
        link.click();
        
        // Show success message
        const originalText = saveButton.textContent;
        saveButton.textContent = 'Saved! 🎨';
        setTimeout(() => {
            saveButton.textContent = originalText;
        }, 2000);
    });
    
    console.log('✅ Graffiti game initialized successfully');
}
