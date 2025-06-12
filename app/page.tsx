import { Cpu, Zap, Database, ArrowRight, Sparkles, BarChart3, Clock, Code, Server, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { BudgetAnalyzer } from "@/components/budget-analyzer"
import { PromptLibrary } from "@/components/prompt-library"
import { RecommendationPanel } from "@/components/recommendation-panel"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900">
      <header className="border-b border-gray-800 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            SUPER DEVELOPER DASHBOARD
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gray-800 bg-black hover:bg-gray-900">
              <Clock className="mr-2 h-4 w-4" />
              Recent Activity
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Sparkles className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Projects</CardTitle>
              <CardDescription>Manage your development projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-sm text-gray-400">Active projects</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-blue-300">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-950 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Deployments</CardTitle>
              <CardDescription>Monitor your application deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <p className="text-sm text-gray-400">Total deployments</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-blue-300">
                View deployments
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-950 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Resources</CardTitle>
              <CardDescription>Track your resource usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">65%</div>
              <p className="text-sm text-gray-400">Of free tier used</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-blue-400 hover:text-blue-300">
                View resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="bg-gray-950 border border-gray-800">
            <TabsTrigger value="projects" className="data-[state=active]:bg-gray-900">
              Projects
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-gray-900">
              Budget Analysis
            </TabsTrigger>
            <TabsTrigger value="prompts" className="data-[state=active]:bg-gray-900">
              Prompt Library
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-gray-900">
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="E-commerce Platform"
                description="Next.js e-commerce platform with Stripe integration"
                type="Next.js"
                lastUpdated="2 days ago"
                progress={75}
                compatibility={["Vercel", "Stripe", "MongoDB"]}
              />
              <ProjectCard
                title="Social Media App"
                description="React-based social media application"
                type="React"
                lastUpdated="1 week ago"
                progress={45}
                compatibility={["Vercel", "Supabase", "Auth.js"]}
              />
              <ProjectCard
                title="Streaming Service"
                description="Video streaming platform similar to Netflix"
                type="Next.js"
                lastUpdated="3 days ago"
                progress={30}
                compatibility={["Vercel", "Cloudinary", "Upstash"]}
              />
              <ProjectCard
                title="Portfolio Site"
                description="Personal portfolio website"
                type="Astro"
                lastUpdated="1 month ago"
                progress={100}
                compatibility={["Vercel", "Contentful"]}
              />
            </div>
          </TabsContent>

          <TabsContent value="budget" className="mt-4">
            <BudgetAnalyzer />
          </TabsContent>

          <TabsContent value="prompts" className="mt-4">
            <PromptLibrary />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <RecommendationPanel />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Vercel Ecosystem</CardTitle>
              <CardDescription>Integrated services and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-black">
                  <div className="bg-blue-900/20 p-2 rounded-md">
                    <Database className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vercel KV</h3>
                    <p className="text-xs text-gray-400">Redis database</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-black">
                  <div className="bg-purple-900/20 p-2 rounded-md">
                    <Server className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vercel Postgres</h3>
                    <p className="text-xs text-gray-400">SQL database</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-black">
                  <div className="bg-green-900/20 p-2 rounded-md">
                    <Layers className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vercel Blob</h3>
                    <p className="text-xs text-gray-400">File storage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-800 bg-black">
                  <div className="bg-orange-900/20 p-2 rounded-md">
                    <Cpu className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vercel AI SDK</h3>
                    <p className="text-xs text-gray-400">AI integration</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-gray-800 bg-black hover:bg-gray-900">
                Explore All Integrations
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with your development tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-gray-800 bg-black p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-900/20 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Need help with your project? Ask me anything about:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Code generation and debugging
                      </li>
                      <li className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Project architecture recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Performance optimization
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Open AI Assistant
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

