// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Download, Database, Info } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// interface ExportDatasetDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   datasetCount: number;
//   filters: any;
// }

// export const ExportDatasetDialog = ({
//   open,
//   onOpenChange,
//   datasetCount,
//   filters,
// }: ExportDatasetDialogProps) => {
//   const [filename, setFilename] = useState(
//     `full_dataset_${new Date().toISOString().split("T")[0]}`
//   );
//   const [format, setFormat] = useState("csv");

//   const handleExport = () => {
//     // Mock export functionality
//     toast.success(`Dataset exported as ${filename}.${format}`);
//     onOpenChange(false);
//   };

//   const activeFiltersCount = Object.values(filters)
//     .flat()
//     .filter(Boolean).length;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Export Filtered Dataset</DialogTitle>
//           <DialogDescription>
//             Download the current filtered dataset for external analysis
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="rounded-lg bg-muted p-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm">
//               <Database className="h-4 w-4 text-muted-foreground" />
//               <span className="font-medium">Dataset Size:</span>
//               <span className="text-muted-foreground">
//                 {(datasetCount / 1000).toFixed(1)}K records
//               </span>
//             </div>
//             <div className="text-xs text-muted-foreground">
//               <span className="font-medium">Filters:</span>{" "}
//               {activeFiltersCount === 0
//                 ? "No filters applied - full dataset"
//                 : `${activeFiltersCount} active filters`}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="format">Export Format</Label>
//             <Select value={format} onValueChange={setFormat}>
//               <SelectTrigger id="format">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="[&_[data-radix-select-item]]:hover:bg-muted [&_[data-radix-select-item][data-state=checked]]:bg-muted">
//                 <SelectItem value="csv">
//                   <div className="flex items-center gap-2">
//                     <Database className="h-4 w-4" />
//                     CSV (Excel Compatible)
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="json">
//                   <div className="flex items-center gap-2">
//                     <Database className="h-4 w-4" />
//                     JSON (Raw Data)
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="filename">Filename</Label>
//               <span className="text-xs text-muted-foreground">Auto</span>
//             </div>
//             <Input
//               id="filename"
//               value={filename}
//               onChange={(e) => setFilename(e.target.value)}
//             />
//             <p className="text-xs text-muted-foreground">
//               File extension will be added automatically
//             </p>
//           </div>

//           <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
//             <div className="flex gap-2">
//               <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
//               <p className="text-xs text-primary">
//                 <strong>Note:</strong> This generates a mock dataset based on
//                 your current filters. In production, this would connect to your
//                 actual data source.
//               </p>
//             </div>
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleExport}>
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Database, Info } from "lucide-react";
import { toast } from "sonner";
import { Filters } from "@/types/filters";

interface ExportDatasetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  datasetCount: number;
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export const ExportDatasetDialog = ({
  open,
  onOpenChange,
  datasetCount,
  filters,
}: ExportDatasetDialogProps) => {
  const [exportFormat, setExportFormat] = useState("csv");
  // Generate mock dataset based on current filters
  const generateMockDataset = () => {
    const activeFiltersCount = Object.values(filters).filter(
      (value) => Array.isArray(value) ? value.length > 0 : value !== null && value !== "Last 90 days"
    ).length;

    // Generate sample data rows
    const sampleData = Array.from({ length: Math.min(1000, datasetCount) }, (_, index) => ({
      id: `REC_${String(index + 1).padStart(6, '0')}`,
      timestamp: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      region: ["North America", "Europe", "Asia Pacific", "Latin America"][Math.floor(Math.random() * 4)],
      country: ["United States", "Canada", "Germany", "United Kingdom", "France", "Japan", "Australia"][Math.floor(Math.random() * 7)],
      specialty: ["Oncology", "Cardiology", "Neurology", "Endocrinology", "Rheumatology"][Math.floor(Math.random() * 5)],
      tier: [`Tier ${Math.floor(Math.random() * 3) + 1}`],
      practiceSetting: ["Hospital", "Private Practice", "Academic Center", "Research Institute"][Math.floor(Math.random() * 4)],
      therapeuticArea: ["Oncology", "Immunology", "Rare Diseases", "Neuroscience"][Math.floor(Math.random() * 4)],
      engagementScore: Math.floor(Math.random() * 100) + 1,
      responseRate: (Math.random() * 100).toFixed(1),
      surveyType: ["Medical Survey", "Advisory Board", "Conference", "Educational Event"][Math.floor(Math.random() * 4)],
      status: ["Completed", "In Progress", "Scheduled", "Cancelled"][Math.floor(Math.random() * 4)],
      notes: `Sample note for record ${index + 1} - filtered data with ${activeFiltersCount} active filters`,
    }));

    return sampleData;
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = (data: any[]) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      // Header row
      headers.join(','),
      // Data rows
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values with commas, quotes, or newlines
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const timestamp = new Date().toISOString().split('T')[0];
    downloadBlob(blob, `gfmi-dataset-${timestamp}.csv`);
  };

  const exportAsJSON = (data: any[]) => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const jsonContent = JSON.stringify({
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: data.length,
        activeFilters: Object.entries(filters)
          .filter(([_, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value !== "Last 90 days")
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
        datasetInfo: {
          totalAvailableRecords: datasetCount,
          appliedFiltersCount: Object.values(filters).filter(
            (value) => Array.isArray(value) ? value.length > 0 : value !== null && value !== "Last 90 days"
          ).length
        }
      },
      data: data
    }, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const timestamp = new Date().toISOString().split('T')[0];
    downloadBlob(blob, `gfmi-dataset-${timestamp}.json`);
  };

  const handleExport = () => {
    try {
      const dataset = generateMockDataset();
      
      if (exportFormat === "csv") {
        exportAsCSV(dataset);
        toast.success(`Dataset exported as CSV (${dataset.length} records)`);
      } else if (exportFormat === "json") {
        exportAsJSON(dataset);
        toast.success(`Dataset exported as JSON (${dataset.length} records)`);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Please try again.");
    }
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => Array.isArray(value) ? value.length > 0 : value !== null && value !== "Last 90 days"
  ).length;
  // const handleExport = () => {
  //   toast.success(`Dataset exported as ${exportFormat.toUpperCase()}`);
  //   onOpenChange(false);
  // };

  // const activeFiltersCount = Object.values(filters).filter(
  //   (value) => Array.isArray(value) ? value.length > 0 : value !== null && value !== "Last 90 days"
  // ).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Export Filtered Dataset
          </DialogTitle>
          <DialogDescription>
            Download the current filtered dataset for external analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dataset Info */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Database className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Dataset Size: {(datasetCount / 1000).toFixed(1)}K records</p>
              <p className="text-sm text-muted-foreground">
                Filters: {activeFiltersCount} active filters
              </p>
            </div>
          </div>

          {/* Export Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select export format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem 
                  value="csv"
                  className="cursor-pointer data-[highlighted]:bg-muted data-[highlighted]:text-foreground focus:bg-muted focus:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    CSV (Excel Compatible)
                  </div>
                </SelectItem>
                <SelectItem 
                  value="json"
                  className="cursor-pointer data-[highlighted]:bg-muted data-[highlighted]:text-foreground focus:bg-muted focus:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    JSON (Raw Data)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              File extension will be added automatically
            </p>
          </div>

          {/* Information Note */}
          <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">Note:</p>
              <p className="text-blue-800 dark:text-blue-200">
                This generates a mock dataset based on your current filters. In production, 
                this would connect to your actual data source.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};