schedule_prompt = """Human: You are a teaching assistant. 
            When given the following availablility: {}, can you come up with a recommended study schedule based on that availability. 
            Do not schedule anything beyond the instructed. 
            If they are not available at a time interval, do not schedule anything between these times.
            For example: If there is something planned from 4:00 PM to 5:00 PM, do not schedule the subjects during this time.
            There are six subjects: Math, English, Social Studies, Art, Physical Education, and Science. These subjects should be in 30 minute intervals.
            The student also gets two 30 minute break intervals. Do not schedule breaks consecutively.
            Make sure to schedule all six classes.

            Only schedule one interval for Math.
            Only schedule one interval for Social Studies
            Only schedule one interval for Art.
            Only schedule one interval for Physical Education.
            Only schedule one interval for Science.
            Only schedule one interval for English.

            Style the schedule so it textually looks like this:
                4:30 PM - 5:00 PM English.
                5:00 PM - 6:00 PM Snack and Break Time.
                6:30 PM - 7:00 PM Math.
            Assistant:
        """

schedule_prompt_1 = """Human: You are a scheduling assistant.
                    When given the following availablility: {}, can you come up with a recommended study schedule based on that availability. 
            Do not schedule anything beyond the instructed. 
            If they are not available at a time interval, do not schedule anything between these times.
            For example: If there is something planned from 4:00 PM to 5:00 PM, do not schedule the subjects during this time.
            There are six subjects: Math, English, Social Studies, Art, Physical Education, and Science. These subjects should be in 30 minute intervals.
            The student also gets two 30 minute break intervals. Do not schedule breaks consecutively.
            Make sure to schedule all six classes.

            Only schedule one interval for Math.
            Only schedule one interval for Social Studies
            Only schedule one interval for Art.
            Only schedule one interval for Physical Education.
            Only schedule one interval for Science.
            Only schedule one interval for English.
            Style the schedule so it resembles json code.:
            [
                {
                date: "Monday, Nov 4, 2023",
                events: [
                    {
                    time: "4:30 PM - 5:00 PM",
                    title: "Snack and Break Time",
                    description: "Time to relax and have a healthy snack to recharge after a busy day."
                    },
                    {
                    time: "5:00 PM - 5:30 PM",
                    title: "Reading & Discussion",
                    description: "Read the assigned short story \"The Lost Kitten\" aloud and discuss the characters and setting."
                    },
                    {
                    time: "Homework: Luna’s Story",
                    description: "Draw a picture of the story's main character, Luna, in its setting. Write two sentences about what Luna did in the story. Due tomorrow."
                    }
                ]
                },
            ];  
            Assistant:
"""

english_prompt = """Human: You are a teaching assistant. Generate some homework assignments for reading and writing.
                    For these assignments, keep them appropriate for the grade level: {}.
                    For reading assignments, assign actual readings that can be found online.
                    For writing assignments, generate a mixture of creative writing and reports.
                    Only generate one assignment each for reading and writing.
                    Do not give any links.
                    Limit your responses to the assignment descriptions.
                    Assistant:
                """

science_prompt = """Human: You are a teaching assistant. Generate some homework assignments for science.
                    For these assignments, keep them appropriate for the grade level: {}.
                    For science assignments, give the student 3 research questions in the same topic and field.
                    Recommend some resources on the web that can help with the questions.
                    Do not give any links.
                    Assistant:
                """

social_studies_prompt = """Human: You are a teaching assistant. Generate some homework assignments for history.
                    For these assignments, keep them appropriate for the grade level: {}.
                    For social studies assignments, give the student 2 research questions in the same topic and field.
                    Recommend some resources on the web that can help with the questions.
                    Do not give any links.
                    Assistant:
                """ 
math_prompt = """Human: You are a teaching assistant. Generate some homework assignments for math.
                    For these assignments, keep them appropriate for the grade level: {}.
                    For math assignments, give the student 10 math questions in the same topic and field.
                    Recommend some resources on the web that can help with the questions.
                    Do not give any links.
                    Assistant:
                """ 

PE_prompt = """Human: You are a teaching assistant. Generate some exercises for physical education.
                    For these exercises, keep them appropriate for the grade level: {}.
                    For PE, give the student some physical exercises they can do.
                    Do not give any links.
                    Assistant:
                """ 

art_prompt = """Human: You are a teaching assistant. Generate some drawing and craft ideas for an art class.
                    For these ideas, keep them appropriate for the grade level: {}.
                    For art, give the student a list of 1 drawing exercise and 1 craft exercise.
                    Offer some resources on the web that can help with these questions.
                    Do not give any links.
                    Assistant:
                """

help_prompt = """Human: You are a teaching assistant. You are being asked some question.
                    The question and some additional context is given: {}.
                    Answer the question to the best of your abilities. 
                    If you don't know, say "I don't know."
                    Offer some additional internet resources based on the question asked. 
                    Assistant:
            Assistant: 
"""
