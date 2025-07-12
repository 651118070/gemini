import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './components/Sidebar.jsx'
import { ContextProvider } from './context/context.jsx'
createRoot(document.getElementById('root')).render(
  <ContextProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar/>
          <main className="flex-1">
            <SidebarTrigger/>
            <App />
          </main>
        </div>
      </SidebarProvider>
      </ContextProvider>

)
