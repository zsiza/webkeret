export interface Video {
  id: string;
  title: string;
  description: string;
  filePath: string;
  category:
    | 'yoga'
    | 'meditation'
    | 'breathing'
    | 'stretching'
    | 'calming'
    | 'energizing';
  access: 'free' | 'premium';
  duration: number;
  chips: [string, string, string];
}
