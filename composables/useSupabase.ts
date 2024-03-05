import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqubwogkrzoavqytbzue.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_KEY is not defined");
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface DataType {
  service_name: string;
  service_due: string;
  service_cost: number;
  // other properties...
}

export function useSupabase() {
  const data = ref<DataType[]>([]);

  onMounted(async () => {
    const { data: result, error } = await supabase
      .from("subscriptions")
      .select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      data.value = result;
    }
  });

  return { data };
}
