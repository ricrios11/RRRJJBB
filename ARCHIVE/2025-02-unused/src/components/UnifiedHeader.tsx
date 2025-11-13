import { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { TimeAwareText, useTimeOfDay } from './TimeAwareContent';
import { useDarkMode } from './DarkModeProvider';
import { BulletproofNavLink, NAVIGATION_CONFIG } from './BulletproofNavigation';
import { TouchOptimized, useDeviceCapabilities } from './MobileOptimization';
import { Menu, Moon, Sun, Clock } from 'lucide-react';

export function UnifiedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeOfDay = useTimeOfDay();
  const { isDark, toggleDarkMode, isAutoMode, setAutoMode } = useDarkMode();
  const capabilities = useDeviceCapabilities();

  const ctaLabels = {
    morning: 'Begin with mastery',
    afternoon: 'Systems-level thinking',
    evening: 'Future-aware innovation'
  };

  const closeMenu = () => {
    console.log('🎯 TechOS: Closing mobile menu');
    setIsMenuOpen(false);
  };

  return (
    <header className="nav-premium border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-2xl sm:text-xl">🎛️</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <h1 className="text-lg sm:text-xl tracking-wide text-foreground">
                Ric Rios
              </h1>
              <span className="text-xs sm:text-sm text-muted-foreground">
                DOS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {NAVIGATION_CONFIG.slice(0, 4).map((section) => (
              <BulletproofNavLink 
                key={section.id}
                href={section.href} 
                className="nav-link cursor-pointer text-sm font-medium"
                offset={100}
              >
                {section.label}
              </BulletproofNavLink>
            ))}
          </nav>

          {/* Controls Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Time-aware greeting - hidden on small mobile */}
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
              <TimeAwareText
                morning="Morning mastery"
                afternoon="Systematic innovation"
                evening="Evening wisdom"
              />
            </span>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 sm:h-9 sm:w-9"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🎯 TechOS: Auto mode toggle clicked');
                  setAutoMode(!isAutoMode);
                }}
                title={isAutoMode ? "Auto mode (evening dark)" : "Manual mode"}
              >
                <Clock className={`h-3 w-3 sm:h-4 sm:w-4 ${isAutoMode ? 'text-blue-500' : 'text-muted-foreground'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8 sm:h-9 sm:w-9 relative"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🎯 TechOS: Dark mode toggle clicked');
                  toggleDarkMode();
                }}
                title={`${isDark ? 'Switch to light' : 'Switch to dark'} mode`}
              >
                {isDark ? (
                  <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                )}
                {!isAutoMode && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Button>
            </div>
            
            {/* CTA Button - Responsive sizing */}
            <Button 
              variant="outline" 
              size="sm" 
              className="border-border text-foreground hover:bg-accent hidden sm:inline-flex text-xs px-3 py-1.5"
            >
              {ctaLabels[timeOfDay]}
            </Button>

            {/* Mobile Menu Toggle */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 sm:h-9 sm:w-9"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🎯 TechOS: Mobile menu toggle clicked');
                  }}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-72 sm:w-80 bg-background border-border"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="text-foreground flex items-center space-x-2">
                    <span className="text-xl">🎛️</span>
                    <span>Ric Rios DOS</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Time-aware greeting in mobile menu */}
                  <div className="text-sm text-muted-foreground border-b border-border pb-4">
                    <TimeAwareText
                      morning="Good morning. Ready for systematic innovation?"
                      afternoon="Good afternoon. Time for strategic thinking?"
                      evening="Good evening. Evening wisdom awaits."
                    />
                  </div>

                  {/* Theme controls in mobile menu */}
                  <div className="space-y-4 border-b border-border pb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Auto dark mode</span>
                      <Switch 
                        checked={isAutoMode} 
                        onCheckedChange={(checked) => {
                          console.log('🎯 TechOS: Auto mode switch changed to:', checked);
                          setAutoMode(checked);
                        }}
                      />
                    </div>
                    {!isAutoMode && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">Dark mode</span>
                        <Switch 
                          checked={isDark} 
                          onCheckedChange={(checked) => {
                            console.log('🎯 TechOS: Dark mode switch changed to:', checked);
                            if (checked !== isDark) {
                              toggleDarkMode();
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-4">
                    {NAVIGATION_CONFIG.slice(0, 4).map((section) => (
                      <div key={section.id} className="block">
                        <BulletproofNavLink
                          href={section.href}
                          onClick={closeMenu}
                          offset={100}
                          className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-accent block cursor-pointer"
                        >
                          {section.label}
                        </BulletproofNavLink>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-border">
                    <TouchOptimized className="w-full">
                      <Button 
                        className="w-full border-border text-foreground hover:bg-accent"
                        variant="outline"
                      >
                        {ctaLabels[timeOfDay]}
                      </Button>
                    </TouchOptimized>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}