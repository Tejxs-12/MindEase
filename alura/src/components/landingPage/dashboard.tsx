"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, Sparkles, Phone, MessageCircle, Lightbulb } from "lucide-react";

const EmotionalHealthDashboard = () => {
  const [moodData] = useState([
    { day: "Mon", mood: "happy" },
    { day: "Tue", mood: "neutral" },
    { day: "Wed", mood: "sad" },
    { day: "Thu", mood: "neutral" },
    { day: "Fri", mood: "happy" },
    { day: "Sat", mood: "excited" },
    { day: "Sun", mood: "happy" },
  ]);

  const [wellnessScore, setWellnessScore] = useState(72);
  const [journalEntry, setJournalEntry] = useState("");

  const aiRecommendations = [
    "Try a 5-minute breathing exercise to reduce stress",
    "Consider a short mindfulness meditation session",
    "You've been consistent with journaling - great job!",
    "Your mood has improved this week - keep it up!",
  ];

  const moodIcons: Record<string, JSX.Element> = {
    happy: <Smile className="text-green-600" />,
    sad: <Frown className="text-blue-600" />,
    neutral: <Meh className="text-gray-600" />,
    excited: <Sparkles className="text-yellow-600" />,
    anxious: <Frown className="text-red-600" />,
  };

  const handleJournalSubmit = () => {
    console.log("Journal entry saved:", journalEntry);
    setJournalEntry("");
    setWellnessScore((prev) => Math.min(prev + 2, 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/10 to-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-foreground">
            Emotional Wellness Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track, reflect, and grow on your mental health journey
          </p>
        </motion.header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mood Tracker */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mood Tracker</CardTitle>
                <CardDescription>Your weekly check-in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end h-32">
                  {moodData.map((dayMood, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-white shadow rounded-full">
                        {moodIcons[dayMood.mood]}
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{dayMood.day}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-secondary/40 rounded-lg text-sm text-muted-foreground">
                  Your mood has improved by 15% compared to last week
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Wellness Score */}
          {/* Wellness Score */}
<motion.div whileHover={{ scale: 1.02 }}>
  <Card>
    <CardHeader>
      <CardTitle>Wellness Score</CardTitle>
      <CardDescription>Your mental health overview</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <motion.div
        className="relative flex items-center justify-center w-32 h-32 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
            fill="transparent"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            stroke="currentColor"
            strokeWidth="8"
            className="text-primary"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 58}
            strokeDashoffset={2 * Math.PI * 58}
            animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - wellnessScore / 100) }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <span className="text-2xl font-bold">{wellnessScore}</span>
      </motion.div>
      <p className="text-sm text-muted-foreground">
        {wellnessScore >= 80
          ? "Excellent!"
          : wellnessScore >= 60
          ? "Good"
          : "Needs attention"}
      </p>
    </CardContent>
  </Card>
</motion.div>


          {/* Daily Reflection */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
                <CardDescription>Write your thoughts</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your thoughts, feelings, or anything on your mind..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-32 mb-4"
                />
                <Button onClick={handleJournalSubmit} className="w-full">
                  Save Reflection
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instant Support */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="bg-accent/10 border-accent">
              <CardHeader>
                <CardTitle className="text-accent-foreground">Instant Support</CardTitle>
                <CardDescription className="text-accent-foreground/70">
                  Help is always here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <MessageCircle className="mr-2" />
                    Chat with Counselor
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2" />
                    Call Emergency Line
                  </Button>
                </div>
                <p className="mt-4 text-xs text-accent-foreground/70">
                  Available 24/7 • Confidential • Professional Support
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Tips just for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiRecommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className="p-4 bg-secondary/30 rounded-lg flex items-start"
                    >
                      <Lightbulb className="mr-3 text-primary mt-1" />
                      <p className="text-sm">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalHealthDashboard;
