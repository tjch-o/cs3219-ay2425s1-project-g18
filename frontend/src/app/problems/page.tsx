'use client'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import CompletedIcon from '@mui/icons-material/TaskAlt';
import { useEffect, useState } from "react";

export default function QuestionsPage() {
    const [questions, setQuestions] = useState([])

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5001/get-questions')
            if (!response.ok) {
                throw new Error('Failed to fetch questions')
            }
            const data = await response.json()
            setQuestions(data)
        } catch (err) {
            console.log("Error", err)
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    return (
        <section className="flex h-full justify-center mt-14">
            <div className="flex-col h-full py-12 w-5/6 2xl:w-3/5">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl 2xl:text-4xl font-bold text-black text-start">
                        Coding Questions
                    </h1>
                    <Button>Create a new question</Button>
                </div>
                <div className="my-12">
                    {/* Search */}
                    {/* Filter */}
                </div>
                <Table className="table-auto">
                    <TableCaption>A list of coding questions</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Difficulty</TableHead>
                            {/* <TableHead>Status</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questions.map((question: any, index: number) => (
                            <TableRow key={index} className="h-20"> {/* Increased height */}
                                <TableCell>{question.questionId}</TableCell>
                                <TableCell>{question.title}</TableCell>
                                <TableCell>
                                    {question.description.length > 80
                                        ? `${question.description.slice(0, 80)}...`
                                        : question.description}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {question.categories.map((c: string) => (
                                            c && <Badge variant="category" key={c}>{c}</Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell><Badge variant={question.difficulty.toLowerCase()}>{question.difficulty}</Badge></TableCell>
                                {/* <TableCell>
                                    {question.status && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CompletedIcon sx={{ color: 'var(--color-completed-hover)' }} />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Solved</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}