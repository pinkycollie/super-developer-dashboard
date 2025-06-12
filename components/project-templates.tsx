"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Download, Check, X } from "lucide-react"

const templates = [
  {
    id: "nextjs-fastapi",
    name: "Next.js + FastAPI",
    description: "Full-stack application with Next.js frontend and FastAPI backend",
    tags: ["Next.js", "FastAPI", "Python", "TypeScript"],
    popular: true,
    features: [
      "Next.js App Router",
      "FastAPI backend",
      "API route proxy",
      "TypeScript",
      "Tailwind CSS",
      "Authentication ready",
    ],
  },
  {
    id: "nextjs-postgres",
    name: "Next.js + Postgres",
    description: "Next.js application with Postgres database and Prisma ORM",
    tags: ["Next.js", "Postgres", "Prisma", "TypeScript"],
    popular: true,
    features: [
      "Next.js App Router",
      "Postgres database",
      "Prisma ORM",
      "TypeScript",
      "Tailwind CSS",
      "Authentication ready",
    ],
  },
  {
    id: "nextjs-supabase",
    name: "Next.js + Supabase",
    description: "Next.js application with Supabase backend",
    tags: ["Next.js", "Supabase", "TypeScript"],
    popular: false,
    features: [
      "Next.js App Router",
      "Supabase backend",
      "Authentication",
      "TypeScript",
      "Tailwind CSS",
      "Real-time subscriptions",
    ],
  },
  {
    id: "nextjs-mongodb",
    name: "Next.js + MongoDB",
    description: "Next.js application with MongoDB database",
    tags: ["Next.js", "MongoDB", "TypeScript"],
    popular: false,
    features: [
      "Next.js App Router",
      "MongoDB database",
      "Mongoose ODM",
      "TypeScript",
      "Tailwind CSS",
      "Authentication ready",
    ],
  },
  {
    id: "nextjs-ai",
    name: "Next.js AI Starter",
    description: "Next.js application with AI SDK integration",
    tags: ["Next.js", "AI", "OpenAI", "TypeScript"],
    popular: true,
    features: [
      "Next.js App Router",
      "Vercel AI SDK",
      "OpenAI integration",
      "TypeScript",
      "Tailwind CSS",
      "Streaming responses",
    ],
  },
  {
    id: "nextjs-ecommerce",
    name: "E-commerce Starter",
    description: "Next.js e-commerce application with payment processing",
    tags: ["Next.js", "E-commerce", "Stripe", "TypeScript"],
    popular: false,
    features: [
      "Next.js App Router",
      "Stripe integration",
      "Shopping cart",
      "Product catalog",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
]

export function ProjectTemplates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [projectName, setProjectName] = useState("")

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const popularTemplates = templates.filter((template) => template.popular)

  return (
    <Card className="border-gray-800">
      <CardHeader>
        <CardTitle>Project Templates</CardTitle>
        <CardDescription>Start your project with a pre-configured template</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search templates..."
            className="pl-9 bg-black border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-950 border border-gray-800 w-full">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-gray-900">
              All Templates
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex-1 data-[state=active]:bg-gray-900">
              Popular
            </TabsTrigger>
            {selectedTemplate && (
              <TabsTrigger value="selected" className="flex-1 data-[state=active]:bg-gray-900">
                Selected Template
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`rounded-lg border ${selectedTemplate === template.id ? "border-blue-600" : "border-gray-800"} bg-black p-4 cursor-pointer hover:border-gray-700 transition-colors`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.popular && (
                      <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`rounded-lg border ${selectedTemplate === template.id ? "border-blue-600" : "border-gray-800"} bg-black p-4 cursor-pointer hover:border-gray-700 transition-colors`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800">
                      Popular
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-900 border-gray-700 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {selectedTemplate && (
            <TabsContent value="selected" className="mt-4 space-y-4">
              {(() => {
                const template = templates.find((t) => t.id === selectedTemplate)
                if (!template) return null

                return (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-gray-800 bg-black p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                        </div>
                        {template.popular && (
                          <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800">
                            Popular
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Features</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {template.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-300">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="project-name">Project Name</Label>
                            <Input
                              id="project-name"
                              placeholder="my-awesome-project"
                              className="bg-black border-gray-800"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={!selectedTemplate || !projectName}
        >
          <Download className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </CardFooter>
    </Card>
  )
}

