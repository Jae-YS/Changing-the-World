schedule_prompt = """Human: You are a teaching assistant. 
            When given the following information: {}, can you come up with a recommended study schedule that best matches the information. 
            There are six subjects: Math, English, Social Studies, Art, Physical Education, and Science. These subjects should be in 30 minute intervals.
            The student also gets two 30 minute break intervals. Do not schedule breaks consecutively.
            Do not schedule anything beyond the instructed. 
            Do not schedule anything in a time interval if you detect conflicts.

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
