import { Monitor, Moon, Sun } from "lucide-react"
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
  return (
    <div className="p-4 space-y-6">
      {/* Theme Selection */}
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="flex gap-2">
          <Button
            variant={settings.theme === "light" ? "default" : "outline"}
            size="icon"
            onClick={() => onChange({ theme: "light" })}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant={settings.theme === "dark" ? "default" : "outline"}
            size="icon"
            onClick={() => onChange({ theme: "dark" })}
          >
            <Moon className="h-4 w-4" />
          </Button>
          <Button
            variant={settings.theme === "sepia" ? "default" : "outline"}
            size="icon"
            onClick={() => onChange({ theme: "sepia" })}
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Display Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Brightness ({settings.brightness}%)</Label>
          <Slider
            value={[settings.brightness]}
            min={50}
            max={150}
            step={5}
            onValueChange={([value]) => onChange({ brightness: value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Contrast ({settings.contrast}%)</Label>
          <Slider
            value={[settings.contrast]}
            min={50}
            max={150}
            step={5}
            onValueChange={([value]) => onChange({ contrast: value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Font Size ({settings.fontSize}px)</Label>
          <Slider
            value={[settings.fontSize]}
            min={12}
            max={24}
            step={1}
            onValueChange={([value]) => onChange({ fontSize: value })}
          />
        </div>
      </div>

      {/* Auto-scroll Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-scroll">Auto-scroll</Label>
          <Switch
            id="auto-scroll"
            checked={settings.autoScroll}
            onCheckedChange={(checked) => onChange({ autoScroll: checked })}
          />
        </div>

        {settings.autoScroll && (
          <div className="space-y-2">
            <Label>Scroll Speed</Label>
            <Slider
              value={[settings.autoScrollSpeed]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => onChange({ autoScrollSpeed: value })}
            />
          </div>
        )}
      </div>

      {/* UI Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-page-number">Show Page Number</Label>
          <Switch
            id="show-page-number"
            checked={settings.showPageNumber}
            onCheckedChange={(checked) => onChange({ showPageNumber: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-progress">Show Progress Bar</Label>
          <Switch
            id="show-progress"
            checked={settings.showProgressBar}
            onCheckedChange={(checked) => onChange({ showProgressBar: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="double-pages">Double Pages (Horizontal)</Label>
          <Switch
            id="double-pages"
            checked={settings.doublePagesForHorizontal}
            onCheckedChange={(checked) => onChange({ doublePagesForHorizontal: checked })}
          />
        </div>
      </div>
    </div>
  )
} 