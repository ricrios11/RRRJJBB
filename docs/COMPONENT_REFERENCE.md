# 📚 COMPONENT REFERENCE

## 🎯 Core Components

### **App.tsx**
Main application component with providers and routing.
- **Providers**: DarkModeProvider, KonamiCodeProvider
- **Layout**: Header, main content, footer
- **Features**: Time-aware content, performance monitoring

### **FeaturedCaseStudy.tsx** ✅ 
Expandable case study component with detailed content.
- **Status**: ✅ "Hide Details" functionality fixed
- **Features**: Toggle expansion, detailed sections, responsive design
- **Fixed Issues**: Multi-click requirement resolved, proper state management

### **CaseStudyCard.tsx** ✅
Grid card component for secondary case studies.
- **Status**: ✅ CTA labels always visible 
- **Features**: Modal trigger, hover effects, key metrics display
- **Fixed Issues**: CTA "View methodology & impact" now always visible

## 🧭 Navigation Components

### **UnifiedHeader.tsx**
Main navigation header with responsive design.
- **Features**: Smooth scrolling, mobile menu, dark mode toggle
- **Responsive**: Collapsible mobile navigation

### **BulletproofNavigation.tsx**
Navigation utilities and smooth scrolling logic.
- **Features**: Section navigation, scroll offset handling
- **Performance**: Optimized scroll behavior

## 📱 Mobile Components

### **MobileFooter.tsx**
Mobile-optimized footer component.
- **Features**: Responsive layout, contact information
- **Design**: Minimal, clean presentation

### **MobileOptimization.tsx**
Mobile performance and animation utilities.
- **Features**: Device capabilities detection, performance monitoring
- **Animations**: Optimized mobile animations

## 🎨 UI Components (ShadCN)

Located in `/src/components/ui/` - 35+ high-quality components:

### **Essential Components**
- **Button**: Various styles and sizes
- **Card**: Layout container with header/content/footer
- **Badge**: Status and category indicators
- **Dialog/Modal**: Overlay content presentation
- **Form**: Form controls and validation

### **Interactive Components**
- **Accordion**: Collapsible content sections
- **Tabs**: Tabbed content organization
- **Tooltip**: Contextual information
- **Popover**: Floating content panels
- **Carousel**: Image/content sliders

### **Data Components**
- **Table**: Data presentation
- **Chart**: Data visualization (with Recharts)
- **Progress**: Progress indicators
- **Avatar**: User representation

## 🎛️ Utility Components

### **TimeAwareContent.tsx**
Dynamic content based on time of day.
- **Props**: morning, afternoon, evening content
- **Logic**: Automatic time detection and content switching

### **DarkModeProvider.tsx**
Theme management context provider.
- **Features**: System preference detection, manual toggle
- **Persistence**: Local storage integration

### **KonamiCodeContext.tsx**
Easter egg functionality for curious visitors.
- **Feature**: Hidden Snake game and other surprises
- **Activation**: Classic Konami code sequence

## 🔧 Component Usage Examples

### **FeaturedCaseStudy**
```tsx
<FeaturedCaseStudy 
  caseStudy={{
    id: "example",
    title: "Example Case Study",
    subtitle: "Strategic Innovation",
    // ... other props
  }}
/>
```

### **CaseStudyCard**
```tsx
<CaseStudyCard 
  caseStudy={caseStudyData}
  delay={200}
/>
```

### **TimeAwareText**
```tsx
<TimeAwareText
  morning="Good morning message"
  afternoon="Good afternoon message"  
  evening="Good evening message"
/>
```

## 🎨 Styling Guidelines

### **CSS Custom Properties**
All components use CSS custom properties for theming:
- `--background`, `--foreground` - Base colors
- `--primary`, `--secondary` - Brand colors
- `--muted`, `--accent` - Supporting colors
- `--border`, `--ring` - UI element colors

### **Responsive Design**
- **Mobile First**: Base styles for mobile, enhanced for desktop
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:` prefixes
- **Touch Targets**: Minimum 44px touch targets on mobile

### **Dark Mode**
- **CSS Variables**: Automatic theme switching via CSS custom properties
- **Component Support**: All components support both light and dark themes
- **User Control**: Manual toggle with system preference detection

---
*Complete component reference for strategic design system*