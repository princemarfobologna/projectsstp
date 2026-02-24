"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Terminal,
  Copy,
  Check,
  Server,
  Package,
  GitBranch,
  AlertCircle,
  CheckCircle2,
  MonitorCog,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-zinc-950 border border-zinc-800">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <span className="text-xs text-zinc-400 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-zinc-400 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-zinc-200 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  children: React.ReactNode
}

function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          {number}
        </div>
        <div className="mt-2 w-px flex-1 bg-border" />
      </div>
      <div className="pb-8 flex-1">
        <h3 className="font-semibold text-foreground mb-3">{title}</h3>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  )
}

export default function SetupPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="lg:pt-0 pt-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">CitrineOS-Core Setup Guide</h1>
            <p className="text-muted-foreground mt-1">
              Step-by-step instructions to start the CitrineOS-Core OCPP server
            </p>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
              <Package className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                Install these tools before starting CitrineOS-Core on any platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Node.js 18+",
                desc: "JavaScript runtime",
                url: "https://nodejs.org",
                badge: "Required",
              },
              {
                name: "Git",
                desc: "Version control",
                url: "https://git-scm.com",
                badge: "Required",
              },
              {
                name: "Docker Desktop",
                desc: "For PostgreSQL & RabbitMQ",
                url: "https://www.docker.com/products/docker-desktop",
                badge: "Required",
              },
              {
                name: "npm / pnpm",
                desc: "Package manager",
                url: "https://nodejs.org",
                badge: "Included with Node.js",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-1 rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium text-foreground text-sm">{item.name}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">{item.desc}</p>
                <Badge variant="secondary" className="ml-6 w-fit text-xs mt-1">
                  {item.badge}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-600 dark:text-amber-400">
              <strong>Windows users:</strong> Make sure Docker Desktop is running before executing any
              Docker commands. You can start it from the Start menu or system tray.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Platform Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MonitorCog className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Platform Instructions</CardTitle>
              <CardDescription>
                Choose your operating system for specific setup commands
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="powershell" className="flex flex-col gap-6">
            <TabsList className="h-auto w-full justify-start gap-1 bg-transparent p-0">
              <TabsTrigger
                value="powershell"
                className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card"
              >
                <Terminal className="h-4 w-4" />
                Windows — PowerShell
              </TabsTrigger>
              <TabsTrigger
                value="cmd"
                className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card"
              >
                <Terminal className="h-4 w-4" />
                Windows — CMD
              </TabsTrigger>
              <TabsTrigger
                value="ubuntu"
                className="gap-2 rounded-lg border border-transparent px-4 py-2 data-[state=active]:border-border data-[state=active]:bg-card"
              >
                <Terminal className="h-4 w-4" />
                Ubuntu / Git Bash
              </TabsTrigger>
            </TabsList>

            {/* ── PowerShell ── */}
            <TabsContent value="powershell" className="mt-0">
              <div className="flex flex-col">
                <Step number={1} title="Clone the CitrineOS-Core repository">
                  <p className="text-sm text-muted-foreground">
                    Open <strong>PowerShell</strong> (search "PowerShell" in the Start menu) and run:
                  </p>
                  <CodeBlock
                    language="powershell"
                    code={`git clone https://github.com/citrineos/citrineos-core.git
cd citrineos-core`}
                  />
                </Step>

                <Step number={2} title="Install dependencies">
                  <p className="text-sm text-muted-foreground">
                    Install all Node.js packages using npm:
                  </p>
                  <CodeBlock language="powershell" code={`npm install`} />
                </Step>

                <Step number={3} title="Start infrastructure services with Docker">
                  <p className="text-sm text-muted-foreground">
                    CitrineOS-Core needs PostgreSQL and RabbitMQ. Docker Compose starts both:
                  </p>
                  <CodeBlock
                    language="powershell"
                    code={`docker compose -f docker-compose.yml up -d`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Verify the containers are running:
                  </p>
                  <CodeBlock language="powershell" code={`docker ps`} />
                </Step>

                <Step number={4} title="Configure environment variables">
                  <p className="text-sm text-muted-foreground">
                    Copy the example environment file and edit it with your settings:
                  </p>
                  <CodeBlock
                    language="powershell"
                    code={`Copy-Item .env.example .env
notepad .env`}
                  />
                </Step>

                <Step number={5} title="Build the project">
                  <CodeBlock language="powershell" code={`npm run build`} />
                </Step>

                <Step number={6} title="Start the CitrineOS-Core server">
                  <p className="text-sm text-muted-foreground">
                    Start the server in production mode:
                  </p>
                  <CodeBlock language="powershell" code={`npm start`} />
                  <p className="text-sm text-muted-foreground">
                    Or start in development mode with live-reload:
                  </p>
                  <CodeBlock language="powershell" code={`npm run dev`} />
                  <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 mt-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-primary">
                      The OCPP WebSocket server will be available at{" "}
                      <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        ws://localhost:8080
                      </code>{" "}
                      by default. Check your <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> file for the exact port.
                    </p>
                  </div>
                </Step>
              </div>
            </TabsContent>

            {/* ── CMD ── */}
            <TabsContent value="cmd" className="mt-0">
              <div className="flex flex-col">
                <Step number={1} title="Clone the CitrineOS-Core repository">
                  <p className="text-sm text-muted-foreground">
                    Open <strong>Command Prompt</strong> (press <kbd aria-label="Windows key plus R" className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs border">Win+R</kbd>, type <code className="text-xs font-mono">cmd</code>, press Enter) and run:
                  </p>
                  <CodeBlock
                    language="cmd"
                    code={`git clone https://github.com/citrineos/citrineos-core.git
cd citrineos-core`}
                  />
                </Step>

                <Step number={2} title="Install dependencies">
                  <CodeBlock language="cmd" code={`npm install`} />
                </Step>

                <Step number={3} title="Start infrastructure services with Docker">
                  <p className="text-sm text-muted-foreground">
                    Start PostgreSQL and RabbitMQ containers:
                  </p>
                  <CodeBlock
                    language="cmd"
                    code={`docker compose -f docker-compose.yml up -d`}
                  />
                  <p className="text-sm text-muted-foreground">
                    Check that both containers are running:
                  </p>
                  <CodeBlock language="cmd" code={`docker ps`} />
                </Step>

                <Step number={4} title="Configure environment variables">
                  <p className="text-sm text-muted-foreground">
                    Copy the example environment file:
                  </p>
                  <CodeBlock
                    language="cmd"
                    code={`copy .env.example .env
notepad .env`}
                  />
                </Step>

                <Step number={5} title="Build the project">
                  <CodeBlock language="cmd" code={`npm run build`} />
                </Step>

                <Step number={6} title="Start the CitrineOS-Core server">
                  <p className="text-sm text-muted-foreground">Production mode:</p>
                  <CodeBlock language="cmd" code={`npm start`} />
                  <p className="text-sm text-muted-foreground">Development mode (live-reload):</p>
                  <CodeBlock language="cmd" code={`npm run dev`} />
                  <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 mt-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-primary">
                      The OCPP WebSocket server will be available at{" "}
                      <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        ws://localhost:8080
                      </code>{" "}
                      by default.
                    </p>
                  </div>
                </Step>
              </div>
            </TabsContent>

            {/* ── Ubuntu / Git Bash ── */}
            <TabsContent value="ubuntu" className="mt-0">
              <div className="flex flex-col">
                <Step number={1} title="Clone the CitrineOS-Core repository">
                  <p className="text-sm text-muted-foreground">
                    Open a <strong>Terminal</strong> (Ubuntu) or <strong>Git Bash</strong> (Windows) and run:
                  </p>
                  <CodeBlock
                    language="bash"
                    code={`git clone https://github.com/citrineos/citrineos-core.git
cd citrineos-core`}
                  />
                </Step>

                <Step number={2} title="Install dependencies">
                  <CodeBlock language="bash" code={`npm install`} />
                  <p className="text-sm text-muted-foreground">
                    <strong>Ubuntu only — </strong>if Node.js is not installed, download and inspect the setup script before running it:
                  </p>
                  <CodeBlock
                    language="bash"
                    code={`# Download the NodeSource setup script and review it before executing
curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
# Review the script contents before running:
# cat nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
npm install`}
                  />
                </Step>

                <Step number={3} title="Start infrastructure services with Docker">
                  <p className="text-sm text-muted-foreground">
                    Start PostgreSQL and RabbitMQ containers:
                  </p>
                  <CodeBlock
                    language="bash"
                    code={`docker compose -f docker-compose.yml up -d`}
                  />
                  <p className="text-sm text-muted-foreground">
                    <strong>Ubuntu — </strong>if Docker is not installed:
                  </p>
                  <CodeBlock
                    language="bash"
                    code={`sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo systemctl start docker
sudo usermod -aG docker $USER
# Re-open your terminal, then:
docker compose -f docker-compose.yml up -d`}
                  />
                  <p className="text-sm text-muted-foreground">Verify running containers:</p>
                  <CodeBlock language="bash" code={`docker ps`} />
                </Step>

                <Step number={4} title="Configure environment variables">
                  <CodeBlock
                    language="bash"
                    code={`cp .env.example .env
nano .env   # or: vim .env`}
                  />
                </Step>

                <Step number={5} title="Build the project">
                  <CodeBlock language="bash" code={`npm run build`} />
                </Step>

                <Step number={6} title="Start the CitrineOS-Core server">
                  <p className="text-sm text-muted-foreground">Production mode:</p>
                  <CodeBlock language="bash" code={`npm start`} />
                  <p className="text-sm text-muted-foreground">Development mode (live-reload):</p>
                  <CodeBlock language="bash" code={`npm run dev`} />
                  <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 mt-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-primary">
                      The OCPP WebSocket server will be available at{" "}
                      <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">
                        ws://localhost:8080
                      </code>{" "}
                      by default. Check your{" "}
                      <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">.env</code>{" "}
                      file for the exact port.
                    </p>
                  </div>
                </Step>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
              <GitBranch className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <CardTitle>Quick Reference</CardTitle>
              <CardDescription>Common commands for managing the server</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Stop Docker containers",
                windows: "docker compose down",
                unix: "docker compose down",
              },
              {
                label: "View server logs",
                windows: "npm run dev",
                unix: "npm run dev",
              },
              {
                label: "Reset the database",
                windows: "docker compose down -v && docker compose up -d",
                unix: "docker compose down -v && docker compose up -d",
              },
              {
                label: "Check Node.js version",
                windows: "node --version",
                unix: "node --version",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border p-4 flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <CodeBlock language="bash" code={item.unix} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
