"use client"

import { useState } from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import type { ViewerSettings } from "@/lib/types"

interface ViewerSettingsPanelProps {
  settings: ViewerSettings
  onChange: (settings: Partial<ViewerSettings>) => void
}

export function ViewerSettingsPanel({ settings, onChange }: ViewerSettingsPanelProps) {
  const handleThemeChange = (theme: 'light' | 'dark' | 'sepia') => {
    onChange({ theme })
  }

  const handleAutoScrollToggle = (enabled: boolean) => {
    onChange({ autoScroll: enabled })
  }

  const handlePageNumberToggle = (enabled: boolean) => {
    onChange({ showPageNumber: enabled })
  }

  const handleProgressBarToggle = (enabled: boolean) => {
    onChange({ showProgressBar: enabled })
  }

  return (
    <div className="py-4 px-1">
      <h3 className="text-lg font-semibold mb-4">Reader Settings</h3>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="space-y-3">
          <Label>Theme</Label>
          <div className="flex gap-2">
            <Button
              variant={settings.theme === 'light' ? "default" : "outline"}
              size="sm"
              onClick={() => handleThemeChange('light')}
              className="flex-1"
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>
            <Button
              variant={settings.theme === 'dark' ? "default" : "outline"}
              size="sm"
              onClick={() => handleThemeChange('dark')}
              className="flex-1"
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>
            <Button
              variant={settings.theme === 'sepia' ? "default" : "outline"}
              size="sm"
              onClick={() => handleThemeChange('sepia')}
              className="flex-1"
            >
              <SunMoon className="h-4 w-4 mr-2" />
              Sepia
            </Button>
          </div>
        </div>

        {/* Display Settings */}
        <div className="space-y-3">
          <Label>Font Size</Label>
          <div className="flex items-center gap-4">
            <span className="text-sm">A</span>
            <Slider
              value={[settings.fontSize]}
              min={12}
              max={24}
              step={1}
              onValueChange={(value) => onChange({ fontSize: value[0] })}
              className="flex-1"
            />
            <span className="text-lg font-semibold">A</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Brightness</Label>
          <div className="flex items-center gap-4">
            <Sun className="h-4 w-4 opacity-30" />
            <Slider
              value={[settings.brightness]}
              min={50}
              max={150}
              step={5}
              onValueChange={(value) => onChange({ brightness: value[0] })}
              className="flex-1"
            />
            <Sun className="h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Contrast</Label>
          <Slider
            value={[settings.contrast]}
            min={70}
            max={130}
            step={5}
            onValueChange={(value) => onChange({ contrast: value[0] })}
          />
        </div>

        {/* Auto Scroll Settings */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-scroll">Auto Scroll</Label>
            <p className="text-sm text-muted-foreground">Automatically scroll through pages</p>
          </div>
          <Switch
            id="auto-scroll"
            checked={settings.autoScroll}
            onCheckedChange={handleAutoScrollToggle}
          />
        </div>
        
        {settings.autoScroll && (
          <div className="space-y-3">
            <Label>Scroll Speed</Label>
            <Slider
              value={[settings.autoScrollSpeed]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => onChange({ autoScrollSpeed: value[0] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
        )}

        {/* UI Elements Settings */}
        <div className="flex items-center justify-between">
          <Label htmlFor="page-number">Show Page Number</Label>
          <Switch
            id="page-number"
            checked={settings.showPageNumber}
            onCheckedChange={handlePageNumberToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="progress-bar">Show Progress Bar</Label>
          <Switch
            id="progress-bar"
            checked={settings.showProgressBar}
            onCheckedChange={handleProgressBarToggle}
          />
        </div>
      </div>
    </div>
  )
} 