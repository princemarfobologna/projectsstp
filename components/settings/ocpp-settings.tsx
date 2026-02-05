"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, Server, Shield, Clock, Wifi, Copy, Check } from "lucide-react"

export function OcppSettings() {
  const [copied, setCopied] = useState(false)
  const [settings, setSettings] = useState({
    ocppVersion: "1.6J",
    wsEndpoint: "wss://ocpp.watt.ma/ws",
    heartbeatInterval: 60,
    meterValueInterval: 30,
    connectionTimeout: 30,
    authorizationTimeout: 10,
    enableTLS: true,
    enableBasicAuth: true,
    enableCertAuth: false,
    allowUnknownChargers: false,
    autoAcceptChargers: false,
    enableLocalAuth: true,
    enableRemoteStart: true,
    enableRemoteStop: true,
    enableReset: true,
    enableUnlock: true,
    enableReservation: true,
    enableSmartCharging: true,
  })

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(settings.wsEndpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* OCPP Server Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>OCPP Server Configuration</CardTitle>
              <CardDescription>
                Configure the central system settings for OCPP communication
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ocppVersion">OCPP Version</Label>
              <Select
                value={settings.ocppVersion}
                onValueChange={(value) => setSettings({ ...settings, ocppVersion: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.6J">OCPP 1.6 JSON</SelectItem>
                  <SelectItem value="1.6S">OCPP 1.6 SOAP</SelectItem>
                  <SelectItem value="2.0.1">OCPP 2.0.1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="wsEndpoint">WebSocket Endpoint</Label>
              <div className="flex gap-2">
                <Input
                  id="wsEndpoint"
                  value={settings.wsEndpoint}
                  onChange={(e) => setSettings({ ...settings, wsEndpoint: e.target.value })}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={handleCopyEndpoint}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Wifi className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Server Status</p>
                  <p className="text-xs text-muted-foreground">OCPP Central System</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary">Online</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timing Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
              <Clock className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <CardTitle>Timing Configuration</CardTitle>
              <CardDescription>Set intervals and timeouts for OCPP operations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="heartbeatInterval">Heartbeat Interval (seconds)</Label>
              <Input
                id="heartbeatInterval"
                type="number"
                value={settings.heartbeatInterval}
                onChange={(e) =>
                  setSettings({ ...settings, heartbeatInterval: Number(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                How often chargers send heartbeat messages
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="meterValueInterval">Meter Value Interval (seconds)</Label>
              <Input
                id="meterValueInterval"
                type="number"
                value={settings.meterValueInterval}
                onChange={(e) =>
                  setSettings({ ...settings, meterValueInterval: Number(e.target.value) })
                }
              />
              <p className="text-xs text-muted-foreground">
                How often chargers report meter values
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="connectionTimeout">Connection Timeout (seconds)</Label>
              <Input
                id="connectionTimeout"
                type="number"
                value={settings.connectionTimeout}
                onChange={(e) =>
                  setSettings({ ...settings, connectionTimeout: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="authorizationTimeout">Authorization Timeout (seconds)</Label>
              <Input
                id="authorizationTimeout"
                type="number"
                value={settings.authorizationTimeout}
                onChange={(e) =>
                  setSettings({ ...settings, authorizationTimeout: Number(e.target.value) })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
              <Shield className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication and security for charger connections
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-foreground">TLS/SSL Encryption</p>
              <p className="text-sm text-muted-foreground">Require encrypted connections (WSS)</p>
            </div>
            <Switch
              checked={settings.enableTLS}
              onCheckedChange={(checked) => setSettings({ ...settings, enableTLS: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-foreground">Basic Authentication</p>
              <p className="text-sm text-muted-foreground">
                Require username/password for charger connections
              </p>
            </div>
            <Switch
              checked={settings.enableBasicAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, enableBasicAuth: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-foreground">Certificate Authentication</p>
              <p className="text-sm text-muted-foreground">
                Use client certificates for authentication
              </p>
            </div>
            <Switch
              checked={settings.enableCertAuth}
              onCheckedChange={(checked) => setSettings({ ...settings, enableCertAuth: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-foreground">Allow Unknown Chargers</p>
              <p className="text-sm text-muted-foreground">
                Accept connections from unregistered chargers
              </p>
            </div>
            <Switch
              checked={settings.allowUnknownChargers}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, allowUnknownChargers: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>OCPP Features</CardTitle>
          <CardDescription>Enable or disable specific OCPP features and commands</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Local Authorization</span>
              <Switch
                checked={settings.enableLocalAuth}
                onCheckedChange={(checked) => setSettings({ ...settings, enableLocalAuth: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Remote Start Transaction</span>
              <Switch
                checked={settings.enableRemoteStart}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableRemoteStart: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Remote Stop Transaction</span>
              <Switch
                checked={settings.enableRemoteStop}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableRemoteStop: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Reset Command</span>
              <Switch
                checked={settings.enableReset}
                onCheckedChange={(checked) => setSettings({ ...settings, enableReset: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Unlock Connector</span>
              <Switch
                checked={settings.enableUnlock}
                onCheckedChange={(checked) => setSettings({ ...settings, enableUnlock: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm text-foreground">Reservation</span>
              <Switch
                checked={settings.enableReservation}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableReservation: checked })
                }
              />
            </div>
            <div className="col-span-2 flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <span className="text-sm font-medium text-foreground">Smart Charging</span>
                <p className="text-xs text-muted-foreground">
                  Enable charging profiles and load management
                </p>
              </div>
              <Switch
                checked={settings.enableSmartCharging}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableSmartCharging: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
