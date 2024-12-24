export interface Database {
  public: {
    Tables: {
      saved_recipes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          ingredients: string[];
          instructions: string[];
          cooking_time: string;
          servings: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          ingredients: string[];
          instructions: string[];
          cooking_time: string;
          servings: number;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          ingredients?: string[];
          instructions?: string[];
          cooking_time?: string;
          servings?: number;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          created_at?: string;
        };
      };
    };
  };
}