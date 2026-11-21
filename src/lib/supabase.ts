import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | undefined;

export function getSupabaseClient(): SupabaseClient {
	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			'Falta configurar PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY en el archivo .env.',
		);
	}

	if (!client) {
		client = createClient(supabaseUrl, supabaseAnonKey);
	}

	return client;
}
