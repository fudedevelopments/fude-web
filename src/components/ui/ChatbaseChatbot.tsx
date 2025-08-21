'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    chatbase: any
  }
}

export default function ChatbaseChatbot() {
  useEffect(() => {
    // Chatbase configuration script
    const initChatbase = () => {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = []
          }
          window.chatbase.q.push(args)
        }

        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string | symbol) {
            if (prop === "q") {
              return target.q
            }
            return (...args: any[]) => target(prop, ...args)
          }
        })
      }

      const onLoad = () => {
        // Check if script is already loaded
        if (document.getElementById("sEKW-VwPb-4Bi3-jGovoy")) {
          return
        }

        const script = document.createElement("script")
        script.src = "https://www.chatbase.co/embed.min.js"
        script.id = "sEKW-VwPb-4Bi3-jGovoy"
        script.setAttribute("data-domain", "www.chatbase.co")
        script.async = true
        
        // Add responsive styles for mobile
        script.onload = () => {
          // Add custom styles for mobile responsiveness
          const style = document.createElement('style')
          style.textContent = `
            @media (max-width: 768px) {
              iframe[src*="chatbase.co"] {
                width: 100% !important;
                max-width: 350px !important;
                height: 500px !important;
                bottom: 80px !important;
                right: 10px !important;
                left: 10px !important;
                margin: 0 auto !important;
              }
              
              /* Chatbot button responsiveness */
              .chatbase-button {
                bottom: 20px !important;
                right: 20px !important;
                width: 50px !important;
                height: 50px !important;
              }
            }
            
            @media (max-width: 480px) {
              iframe[src*="chatbase.co"] {
                height: 450px !important;
                bottom: 70px !important;
                max-width: 320px !important;
              }
            }
            
            /* Ensure chatbot doesn't interfere with other elements */
            iframe[src*="chatbase.co"] {
              z-index: 1000 !important;
              border-radius: 12px !important;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
            }
            
            .chatbase-button {
              background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
              border: none !important;
              border-radius: 50% !important;
              box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
              transition: all 0.3s ease !important;
            }
            
            .chatbase-button:hover {
              transform: scale(1.1) !important;
              box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6) !important;
            }
          `
          document.head.appendChild(style)
        }
        
        document.body.appendChild(script)
      }

      if (document.readyState === "complete") {
        onLoad()
      } else {
        window.addEventListener("load", onLoad)
      }
    }

    // Initialize chatbase
    initChatbase()

    // Cleanup function
    return () => {
      // Remove event listener if it was added
      window.removeEventListener("load", () => {})
      
      // Optional: Remove chatbase script on unmount (uncomment if needed)
      // const script = document.getElementById("sEKW-VwPb-4Bi3-jGovoy")
      // if (script) {
      //   script.remove()
      // }
    }
  }, [])

  // This component doesn't render anything visible
  // The chatbot will be injected by the Chatbase script
  return null
}
