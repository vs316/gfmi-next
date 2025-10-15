import { useState, useEffect } from 'react';

export function useExportDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenExportDropdown = (event: CustomEvent) => {
      console.log('Export dropdown event received from:', event.detail.source);
      setIsOpen(true);
    };

    window.addEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    
    return () => {
      window.removeEventListener('open-export-dropdown', handleOpenExportDropdown as EventListener);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
