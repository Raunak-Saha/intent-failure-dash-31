
import { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';

interface DataTableProps {
  data: any[];
  title: string;
  defaultSort?: [string, 'asc' | 'desc'];
  frozenColumns?: number;
  onRowClick?: (row: any) => void;
  clickableColumn?: string;
}

const DataTable = ({ data, title, defaultSort, frozenColumns = 0, onRowClick, clickableColumn }: DataTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(defaultSort ? { key: defaultSort[0], direction: defaultSort[1] } : null);
  
  const [filterText, setFilterText] = useState('');

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply filter
    if (filterText) {
      filtered = data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(filterText.toLowerCase())
        )
      );
    }

    // Apply sort
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle numeric values
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        // Handle string values
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, sortConfig, filterText]);

  const handleSort = (column: string) => {
    setSortConfig(current => {
      if (current?.key === column) {
        return {
          key: column,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key: column, direction: 'desc' };
    });
  };

  const getSortIcon = (column: string) => {
    if (sortConfig?.key !== column) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4" />
      : <ArrowDown className="w-4 h-4" />;
  };

  const formatCellValue = (value: any) => {
    if (typeof value === 'number') {
      // Format percentages
      if (value < 1 && value > 0) {
        return `${(value * 100).toFixed(1)}%`;
      }
      // Format numbers with decimals
      return value % 1 === 0 ? value.toString() : value.toFixed(2);
    }
    return String(value);
  };

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const isRowClickable = (column: string) => {
    return clickableColumn === column;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search all columns..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white overflow-auto max-h-96">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((column, index) => (
                <TableHead 
                  key={column}
                  className={`font-semibold ${
                    index < frozenColumns ? 'sticky left-0 bg-gray-50 z-10' : ''
                  }`}
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column)}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    {column}
                    {getSortIcon(column)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <TableCell 
                    key={column}
                    className={`${
                      colIndex < frozenColumns ? 'sticky left-0 bg-white z-10' : ''
                    } ${
                      typeof row[column] === 'number' ? 'text-right font-mono' : ''
                    } ${
                      isRowClickable(column) ? 'cursor-pointer hover:text-blue-600 hover:underline' : ''
                    }`}
                    onClick={() => isRowClickable(column) ? handleRowClick(row) : undefined}
                  >
                    {formatCellValue(row[column])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredAndSortedData.length} of {data.length} entries
        {clickableColumn && (
          <span className="ml-2 text-blue-600">• Click on {clickableColumn} to view details</span>
        )}
      </div>
    </div>
  );
};

export default DataTable;
