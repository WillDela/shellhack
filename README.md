Demo Video and Proof of Hackathon: https://devpost.com/software/sylly

# About the Project

## Inspiration

The idea for Sylly came out of just how annoying it is to juggle syllabi, assignments, and deadlines across a bunch of different classes and platforms. Every professor uploads a syllabus somewhere different, in a different format, and you end up manually tracking due dates across five separate systems. We wanted one centralized place where all of that could actually live together instead.

## What it does

Sylly is a student-focused academic planner. It lets you:

- Upload and store your syllabi
- Automatically pull out assignments and due dates instead of manually copying them over
- Preview the syllabus PDF side-by-side with what got extracted from it, so you can double check accuracy
- Manage all your courses and deadlines in one place
- Log in securely through Auth0

The goal was pretty simple: cut down on the administrative overhead of just tracking what's due, so there's more mental space left for actually doing the work.

## How we built it

- **Frontend:** React + TypeScript, bundled with Vite
- **UI:** Bootstrap plus custom CSS for the responsive stuff Bootstrap didn't handle out of the box
- **Auth:** Auth0 for login/logout and token handling
- **State:** React Context API for sharing course and assignment data across components
- **File handling:** upload and preview support for syllabus PDFs

We tried to keep the structure flexible enough that something like calendar sync could get bolted on later without a rewrite.

## Challenges we ran into

- Getting the navbar responsive while still keeping a full-width layout was more finicky than expected
- PDF preview rendering wasn't consistent across browsers, which took some trial and error to sort out
- Auth0 token flows had a few debugging headaches, mostly around figuring out exactly where in the flow things were failing
- Keeping state in sync when adding courses and assignments at the same time
- Just generally scoping features realistically against how little time a hackathon actually gives you

## What we're proud of

- The UI ended up feeling pretty clean and intuitive, which wasn't a given this early
- Auth0 integration actually worked end to end
- The PDF viewer showing syllabi next to extracted data came together better than we expected
- We got a working course/assignment management system built in a short window
- The team worked well together under time pressure, which isn't always a given in a hackathon setting

## What we learned

- How to structure a React + TypeScript project so it doesn't fall apart as it grows
- Using React Context to share state across components without it turning into a mess
- Bootstrap's responsive utilities can get you pretty far, but customizing on top of them takes some care
- Got better at debugging async flows and UI rendering issues under time pressure
- Planning and communicating clearly as a team matters more in a hackathon than almost anywhere else, since there's no time to recover from miscommunication

## What's next for Sylly

- **Collaboration tools** — group planning for shared projects and study sessions
- **Analytics dashboard** — tracking workload and deadline trends over a semester
- **Smart reminders** — notifications timed around due dates or planned study sessions
- **Cross-platform sync** — consistent experience across web, mobile, and tablet
- **Resource hub** — attaching lecture slides, readings, or notes directly to a syllabus item
- **Instructor integration** — letting professors push syllabus updates in real time instead of students re-uploading
- **Focus mode** — a distraction-free view with timers and task tracking
- **Multilingual support** — making the app usable for international students

Sylly is meant to help students stay on top of their academics, one syllabus at a time.
