"use client";
import { useEffect } from 'react';

interface AutoCollapseSidebarOptions {
  enabled?: boolean;
  sidebarSelectors?: string[];
  collapseButtonSelectors?: string[];
  delay?: number;
}

export const useAutoCollapseSidebar = ({
  enabled = true,
  sidebarSelectors = [
    '[data-sidebar]',
    '.sidebar',
    '#sidebar',
    '[class*="sidebar"]',
    '[class*="nav-sidebar"]',
    '.main-navigation',
    '.side-navigation'
  ],
  collapseButtonSelectors = [
    '[data-sidebar-toggle]',
    '[data-sidebar-collapse]',
    '.sidebar-toggle',
    '.sidebar-collapse',
    '[aria-label*="collapse" i]',
    '[aria-label*="toggle" i]',
    'button[class*="sidebar"]',
    'button[class*="collapse"]'
  ],
  delay = 100
}: AutoCollapseSidebarOptions = {}) => {

  useEffect(() => {
    if (!enabled) return;

    const collapseSidebar = () => {
      try {
        // Method 1: Look for collapse/toggle buttons
        for (const selector of collapseButtonSelectors) {
          const button = document.querySelector(selector) as HTMLElement;
          if (button) {
            console.log(`Found sidebar toggle button: ${selector}`);
            button.click();
            return true;
          }
        }

        // Method 2: Look for sidebars and try to collapse them directly
        for (const selector of sidebarSelectors) {
          const sidebar = document.querySelector(selector) as HTMLElement;
          if (sidebar && sidebar.offsetWidth > 0) {
            console.log(`Found sidebar: ${selector}`);
            
            // Try common collapse methods
            if (sidebar.classList.contains('expanded')) {
              sidebar.classList.remove('expanded');
              sidebar.classList.add('collapsed');
              return true;
            }
            
            if (sidebar.style.width && sidebar.style.width !== '0px') {
              sidebar.style.width = '0px';
              sidebar.style.overflow = 'hidden';
              return true;
            }

            // Try to hide the sidebar
            if (sidebar.style.display !== 'none') {
              sidebar.dataset.originalDisplay = sidebar.style.display || 'block';
              sidebar.style.display = 'none';
              return true;
            }
          }
        }

        // Method 3: Look for common framework-specific patterns
        // Bootstrap sidebar
        const bsOffcanvas = document.querySelector('.offcanvas.show');
        if (bsOffcanvas) {
          const bsButton = document.querySelector('[data-bs-dismiss="offcanvas"]') as HTMLElement;
          if (bsButton) bsButton.click();
          return true;
        }

        // Ant Design sidebar
        const antSider = document.querySelector('.ant-layout-sider:not(.ant-layout-sider-collapsed)');
        if (antSider) {
          const antButton = document.querySelector('.ant-layout-sider-trigger') as HTMLElement;
          if (antButton) antButton.click();
          return true;
        }

        return false;
      } catch (error) {
        console.warn('Error while trying to collapse sidebar:', error);
        return false;
      }
    };

    // Try immediately and after a short delay
    const timer = setTimeout(() => {
      const collapsed = collapseSidebar();
      if (collapsed) {
        console.log('Successfully collapsed external sidebar');
      } else {
        console.log('No external sidebar found to collapse');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [enabled, delay]);
};
