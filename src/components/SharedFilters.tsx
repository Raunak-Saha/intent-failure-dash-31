
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SharedFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  dateTime: string;
  endpoint: string;
  chatVersion: string;
  userType: string;
  source: string;
}

const SharedFilters = ({ onFiltersChange }: SharedFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    dateTime: "",
    endpoint: "all",
    chatVersion: "all",
    userType: "all",
    source: "all"
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilter = (key: keyof FilterState) => {
    const defaultValue = key === "dateTime" ? "" : "all";
    updateFilter(key, defaultValue);
  };

  const hasActiveFilters = filters.dateTime || 
    filters.endpoint !== "all" || 
    filters.chatVersion !== "all" || 
    filters.userType !== "all" ||
    filters.source !== "all";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>
          Filter data by date, endpoint, chat version, user type, and source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="datetime-input">Date & Time</Label>
            <Input
              id="datetime-input"
              type="datetime-local"
              value={filters.dateTime}
              onChange={(e) => updateFilter("dateTime", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endpoint-select">Endpoint</Label>
            <Select value={filters.endpoint} onValueChange={(value) => updateFilter("endpoint", value)}>
              <SelectTrigger id="endpoint-select">
                <SelectValue placeholder="Select endpoint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Endpoints</SelectItem>
                <SelectItem value="win32">Win32</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-version-select">Chat Version</Label>
            <Select value={filters.chatVersion} onValueChange={(value) => updateFilter("chatVersion", value)}>
              <SelectTrigger id="chat-version-select">
                <SelectValue placeholder="Select chat version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Versions</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="side">Side</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-type-select">User Type</Label>
            <Select value={filters.userType} onValueChange={(value) => updateFilter("userType", value)}>
              <SelectTrigger id="user-type-select">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source-select">Source</Label>
            <Select value={filters.source} onValueChange={(value) => updateFilter("source", value)}>
              <SelectTrigger id="source-select">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="plugins">Plugins</SelectItem>
                <SelectItem value="mainline">Mainline</SelectItem>
                <SelectItem value="declarative-agents">Declarative Agents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.dateTime && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Date: {new Date(filters.dateTime).toLocaleDateString()}
                <button
                  onClick={() => clearFilter("dateTime")}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.endpoint !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Endpoint: {filters.endpoint}
                <button
                  onClick={() => clearFilter("endpoint")}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.chatVersion !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Chat: {filters.chatVersion}
                <button
                  onClick={() => clearFilter("chatVersion")}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.userType !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                User: {filters.userType}
                <button
                  onClick={() => clearFilter("userType")}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.source !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Source: {filters.source}
                <button
                  onClick={() => clearFilter("source")}
                  className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SharedFilters;
