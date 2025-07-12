import { HelpCircle,Activity,Settings,Plus, MessageCircle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Button }from '@/components/ui/button'
import { SidebarSeparator } from "./ui/sidebar"
import { useContext } from "react"
import { GeminiContext } from "../context/context"
// Menu items.
const items = [
  {
    title: "Help",
    url: "/",
    icon: HelpCircle,
  },
  {
    title:"Activity",
    url: "/",
    icon:Activity,
  },

  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
]

export  function AppSidebar() {
  const {previousPrompt,setRecent,setResult,setResultData}=useContext(GeminiContext)
  return (
    <Sidebar className='overflow-hidden '>
      <SidebarContent className='flex flex-col justify-between h-screen m-4 '>
        <Button onClick={()=>setResult(false)}><Plus/>New Chat</Button>
        <div className="flex flex-1 flex-col">
          <p className="pl-4">Recent Chats</p>
          
          {
            previousPrompt.length > 0 ? (
              <div className="flex flex-col gap-y-2">
                {previousPrompt.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <MessageCircle/>
                    <Button
                
                    variant="ghost"
                    className="justify-start cursor-pointer"
                    onClick={async () => {
                      setRecent(item.prompt);
                      setResult(true);
                      setResultData(item.result); 
        
                    }}
                    
                  >
                    {item.prompt.slice(0,20)}...
                  </Button>
                  </div>
                  
                ))}
              </div>
            ) : (
              <p className="text-gray-500 pl-4">No recent chats</p>
            )
          }
        </div>
        <SidebarSeparator/>
        <SidebarGroup>
        
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

       </SidebarContent>

    </Sidebar>
  )
}