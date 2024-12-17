"use client";

import React, { useState } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postCategory, updateCategory } from "../create/actions";
import { ActionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Category } from "@prisma/client";

const initialState: ActionResult = {
    error: "",
};

interface FormCategoryProps {
    type?: "Add" | "EDIT";
    data?: Category | null;
}

export default function FormCategory({ data = null, type = "Add" }: FormCategoryProps) {
    const updateCategoryWithId = (_: unknown, formData: FormData) => updateCategory(_, formData, data?.id);

    const [state, setState] = useState<ActionResult>(initialState);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const formAction = type === "Add" ? postCategory : updateCategoryWithId;
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const result = await formAction(null, formData);

        if (result && !result.error) {
            router.push("/dashboard/categories/");
            router.refresh();
        } else {
            setState(result);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Category Controller
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <Card className="w-[500px]">
                        <CardHeader>
                            <CardTitle>Category Details</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing elit
                            </CardDescription>
                            {state.error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{state.error}</AlertDescription>
                                </Alert>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full"
                                        defaultValue={data?.name}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-start gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => router.push("/dashboard/categories")}
                        >
                            Discard
                        </Button>
                        <Button type="submit" size="sm" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Category"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
