import React, { useState, useEffect } from "react";
import { User, LogIn, LogOut, Crown, Zap, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const AuthButton: React.FC = () => {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBenefits, setShowBenefits] = useState(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center space-x-2 text-[#b9bbbe]">
                <div className="w-4 h-4 border-2 border-[#40444b] border-t-[#5865f2] rounded-full animate-spin"></div>
                <span className="text-sm">Loading...</span>
            </div>
        );
    }

    if (user) {
        return (
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 text-[#dcddde]">
                    <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#5865f2] to-[#4752c4] rounded-full flex items-center justify-center shadow-md">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#faa61a] rounded-full flex items-center justify-center">
                            <Crown className="w-2.5 h-2.5 text-white" />
                        </div>
                    </div>
                    <div>
                        <span className="text-sm font-medium">{user.email?.split("@")[0]}</span>
                        <div className="flex items-center space-x-1">
                            <Zap className="w-3 h-3 text-[#57f287]" />
                            <span className="text-xs text-[#57f287] font-bold">PREMIUM</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 bg-[#40444b] hover:bg-[#4f545c] text-[#dcddde] px-3 py-2 rounded-md transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#5865f2] to-[#4752c4] hover:from-[#4752c4] hover:to-[#3c4043] text-white px-4 py-2 rounded-md transition-all font-medium shadow-md hover:shadow-lg w-full justify-center">
                <LogIn className="w-4 h-4" />
                <span>Sign In with GitHub</span>
            </button>

            {/* Collapsible Benefits Preview */}
            <div className="bg-[#40444b]/50 border border-[#5865f2]/20 rounded-lg overflow-hidden">
                <button
                    onClick={() => setShowBenefits(!showBenefits)}
                    className="w-full flex items-center justify-between p-3 hover:bg-[#40444b]/70 transition-colors">
                    <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-[#faa61a]" />
                        <span className="text-xs font-bold text-[#faa61a]">UNLOCK PREMIUM</span>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-[#b9bbbe] transition-transform ${
                            showBenefits ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {showBenefits && (
                    <div className="px-3 pb-3">
                        <ul className="text-xs text-[#b9bbbe] space-y-1">
                            <li className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-[#57f287]" />
                                <span>Save & organize your ideas</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-[#57f287]" />
                                <span>Advanced uniqueness analysis</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-[#57f287]" />
                                <span>AI refinement & export tools</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Zap className="w-3 h-3 text-[#57f287]" />
                                <span>Priority support & updates</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
