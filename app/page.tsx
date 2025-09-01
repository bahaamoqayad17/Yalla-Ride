import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Yalla-Ride</h1>
            <p className="text-xl text-muted-foreground">
              Your Figma Design System in Action
            </p>
          </div>

          {/* Color Palette Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Figma Color Palette</CardTitle>
              <CardDescription>
                Your custom color scheme integrated into the design system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Primary Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-20 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        Primary
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #0055FE - Primary Blue
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground font-semibold">
                        Secondary
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #00FFD0 - Secondary Teal
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Text Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-20 bg-foreground rounded-lg flex items-center justify-center">
                      <span className="text-background font-semibold">
                        Title
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #000000 - Title Black
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 bg-muted-foreground rounded-lg flex items-center justify-center">
                      <span className="text-background font-semibold">
                        Description
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      #666666 - Text Description
                    </p>
                  </div>
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Semantic Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        Muted
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-accent rounded-lg flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">
                        Accent
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-destructive rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">Destructive</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-border rounded-lg flex items-center justify-center">
                      <span className="text-foreground text-sm">Border</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Component Examples</CardTitle>
              <CardDescription>
                See how your colors work with the UI components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="gradient-outline">Gradient Outline</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </div>

              {/* Form Elements */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Form Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature 1</CardTitle>
                      <CardDescription>
                        Description of feature one
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature 2</CardTitle>
                      <CardDescription>
                        Description of feature two
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature 3</CardTitle>
                      <CardDescription>
                        Description of feature three
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Usage Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Color Usage Guide</CardTitle>
              <CardDescription>
                How to use your custom colors in Tailwind classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Tailwind Classes</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <code className="bg-primary text-primary-foreground px-2 py-1 rounded">
                          bg-primary
                        </code>{" "}
                        - Primary background
                      </div>
                      <div>
                        <code className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          bg-secondary
                        </code>{" "}
                        - Secondary background
                      </div>
                      <div>
                        <code className="bg-muted text-muted-foreground px-2 py-1 rounded">
                          bg-muted
                        </code>{" "}
                        - Muted background
                      </div>
                      <div>
                        <code className="bg-accent text-accent-foreground px-2 py-1 rounded">
                          bg-accent
                        </code>{" "}
                        - Accent background
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Your Figma Colors</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Primary
                        </code>{" "}
                        - #0055FE (Blue)
                      </div>
                      <div>
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Secondary
                        </code>{" "}
                        - #00FFD0 (Teal)
                      </div>
                      <div>
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Text
                        </code>{" "}
                        - #000000 (Black)
                      </div>
                      <div>
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          Background
                        </code>{" "}
                        - #FFFFFF (White)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
