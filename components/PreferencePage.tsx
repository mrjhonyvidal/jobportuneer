"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const schema = z.object({
  enableNotifications: z.boolean().default(false),
  followUpFrequencyDays: z.number().min(1).max(30).optional(),
  remindBeforeInterview: z.number().min(1).max(7).optional(),
  jobApplicationDeadlineReminder: z.boolean().default(false),
  jobApplicationDeadlineDays: z.number().min(1).max(30).optional(),
  newJobMatches: z.boolean().default(false),
  interviewFollowUpReminder: z.boolean().default(false),
  interviewFollowUpDays: z.number().min(1).max(30).optional(),
  notifyJobStatusChange: z.boolean().default(true), // Enabled by default
});

type PreferenceFormValues = z.infer<typeof schema>;

export default function PreferencesPage() {
  const form = useForm<PreferenceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      enableNotifications: false,
      followUpFrequencyDays: 7,
      remindBeforeInterview: 3,
      jobApplicationDeadlineReminder: false,
      jobApplicationDeadlineDays: 5,
      newJobMatches: false,
      interviewFollowUpReminder: false,
      interviewFollowUpDays: 3,
      notifyJobStatusChange: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const enableNotifications = form.watch("enableNotifications");

  const toggleAllNotifications = (enabled: boolean) => {
    form.setValue("followUpFrequencyDays", enabled ? 7 : undefined);
    form.setValue("remindBeforeInterview", enabled ? 3 : undefined);
    form.setValue("jobApplicationDeadlineReminder", enabled);
    form.setValue("jobApplicationDeadlineDays", enabled ? 5 : undefined);
    form.setValue("newJobMatches", enabled);
    form.setValue("interviewFollowUpReminder", enabled);
    form.setValue("interviewFollowUpDays", enabled ? 3 : undefined);
    form.setValue("notifyJobStatusChange", enabled);
  };

  const onSubmit = async (data: PreferenceFormValues) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
      });
      console.log(data);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Notification Preferences
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Enable All Notifications */}
          <FormField
            control={form.control}
            name="enableNotifications"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel className="text-base font-medium">
                    Enable All Notifications
                  </FormLabel>
                  <FormDescription>
                    Turn all notifications on or off.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      toggleAllNotifications(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Notify Job Status Change (Always Visible) */}
          <FormField
            control={form.control}
            name="notifyJobStatusChange"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel className="text-base font-medium">
                    Notify Job Status Change
                  </FormLabel>
                  <FormDescription>
                    Receive notifications when a job&apos;s status changes.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {enableNotifications && (
            <>
              {/* Follow-Up Frequency */}
              <FormField
                control={form.control}
                name="followUpFrequencyDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow-Up Frequency (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      How often would you like to follow up with potential job
                      contacts?
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Remind Before Interview */}
              <FormField
                control={form.control}
                name="remindBeforeInterview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remind Before Interview (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="7"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Number of days before an interview youd like to receive a
                      reminder.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Job Application Deadline */}
              <FormField
                control={form.control}
                name="jobApplicationDeadlineReminder"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Job Application Deadline Reminder</FormLabel>
                      <FormDescription>
                        Notify you when job application deadlines are
                        approaching.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.watch("jobApplicationDeadlineReminder") && (
                <FormField
                  control={form.control}
                  name="jobApplicationDeadlineDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days Before Deadline</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="30"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {/* New Job Matches */}
              <FormField
                control={form.control}
                name="newJobMatches"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>New Job Matches</FormLabel>
                      <FormDescription>
                        Notify you about new job postings matching your saved
                        searches.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Interview Follow-Up Reminder */}
              <FormField
                control={form.control}
                name="interviewFollowUpReminder"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Interview Follow-Up Reminder</FormLabel>
                      <FormDescription>
                        Remind you to follow up after an interview.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.watch("interviewFollowUpReminder") && (
                <FormField
                  control={form.control}
                  name="interviewFollowUpDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days After Interview</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="30"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
