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
          created_at: string;
          etc: string | null;
          frequency: string | null;
          id: string;
          initial_date: string | null;
          name: string | null;
          period: string | null;
          public: boolean | null;
          thumnail: string | null;
          user_id: string | null;
          vaild_time: string | null;
        };
        Insert: {
          created_at?: string;
          etc?: string | null;
          frequency?: string | null;
          id?: string;
          initial_date?: string | null;
          name?: string | null;
          period?: string | null;
          public?: boolean | null;
          thumnail?: string | null;
          user_id?: string | null;
          vaild_time?: string | null;
        };
        Update: {
          created_at?: string;
          etc?: string | null;
          frequency?: string | null;
          id?: string;
          initial_date?: string | null;
          name?: string | null;
          period?: string | null;
          public?: boolean | null;
          thumnail?: string | null;
          user_id?: string | null;
          vaild_time?: string | null;
        };
        Relationships: [];
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
            foreignKeyName: "userchallenges_challengingid_fkey";
            columns: ["challenge_id"];
            isOneToOne: false;
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "userchallenges_joineduserid_fkey";
            columns: ["user_profile_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
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
      user_profiles: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          profile_url: string | null;
          user_id: string;
          user_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          profile_url?: string | null;
          user_id?: string;
          user_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          profile_url?: string | null;
          user_id?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
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
