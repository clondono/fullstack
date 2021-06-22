export interface LabelResultParams {
  image_id: string;
  label_result: string;
  severity?: string;
  action?: string;
  urgency?: string;
  severity_notes?: string;
  action_notes?: string;
  urgency_notes?: string;
}

export interface Option {
  id: string;
  display_name: string;
}
