
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Template } from "@/types/template";

interface SavedTemplatesProps {
  templates: Template[];
  onUseTemplate: (template: Template) => void;
  onDeleteTemplate: (id: string) => void;
}

const SavedTemplates = ({
  templates,
  onUseTemplate,
  onDeleteTemplate,
}: SavedTemplatesProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Saved Templates</CardTitle>
        <CardDescription>
          Quickly run your saved scraper configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {templates.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No templates saved yet. Save a configuration to reuse it later.
          </div>
        ) : (
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.source} • {template.jobTitle || "No title filter"} •{" "}
                    {template.location || "No location filter"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-job-blue-700 border-job-blue-300 hover:bg-job-blue-50"
                    onClick={() => onUseTemplate(template)}
                  >
                    <Play size={16} className="mr-1" />
                    Use
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-700 border-red-300 hover:bg-red-50"
                    onClick={() => {
                      onDeleteTemplate(template.id);
                      toast.success(`Template "${template.name}" deleted`);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedTemplates;
