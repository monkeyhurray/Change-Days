export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          end_date: string | null;
          end_time: string | null;
          etc: string | null;
          frequency: string | null;
          id: string;
          name: string | null;
          public: boolean | null;
          start_date: string | null;
          start_time: string | null;
          thumbnail: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          end_date?: string | null;
          end_time?: string | null;
          etc?: string | null;
          frequency?: string | null;
          id?: string;
          name?: string | null;
          public?: boolean | null;
          start_date?: string | null;
          start_time?: string | null;
          thumbnail?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          end_date?: string | null;
          end_time?: string | null;
          etc?: string | null;
          frequency?: string | null;
          id?: string;
          name?: string | null;
          public?: boolean | null;
          start_date?: string | null;
          start_time?: string | null;
          thumbnail?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_challenges_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["uid"];
          }
        ];
      };
      user_challenges: {
        Row: {
          challenge_id: string;
          id: string;
          user_profile_id: string;
        };
        Insert: {
          challenge_id: string;
          id?: string;
          user_profile_id: string;
        };
        Update: {
          challenge_id?: string;
          id?: string;
          user_profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_challenges_user_profile_id_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["uid"];
          },
          {
            foreignKeyName: "userchallenges_challengingid_fkey";
            columns: ["challenge_id"];
            isOneToOne: false;
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          }
        ];
      };
      user_fulfill: {
        Row: {
          date: string;
          id: string;
          isdone: boolean;
          user_challenge_id: string;
        };
        Insert: {
          date: string;
          id?: string;
          isdone?: boolean;
          user_challenge_id: string;
        };
        Update: {
          date?: string;
          id?: string;
          isdone?: boolean;
          user_challenge_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "userchallengeprogress_userchallengeid_fkey";
            columns: ["user_challenge_id"];
            isOneToOne: false;
            referencedRelation: "user_challenges";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          name: string | null;
          uid: string;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          name?: string | null;
          uid: string;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          name?: string | null;
          uid?: string;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_uid_fkey";
            columns: ["uid"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
