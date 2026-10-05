export const event = {
	name: "AWS Community Day Bandung 2026",
	description:
		"AWS Community Day Bandung 2026 is on Saturday, 7 November 2026 at SBM ITB, Bandung: a full day of AWS talks and hands-on workshops by the community.",
	startDate: "2026-11-07T09:00:00+07:00",
	endDate: "2026-11-07T16:00:00+07:00",
	venue: "Auditorium SBM ITB, Gedung Labtek XIX Lt. 6",
	address: "Jl. Ganesa No.10",
	mapUrl: "https://maps.app.goo.gl/XH8AnKxTGobUdH5A7",
	ticketUrl: "https://gultix.awscommunity.id/AWSUGBandung/CommunityDay26/",
	// Keep in sync with General Admission's availability window in Pretix.
	ticketOpensAt: "2026-09-29T09:00:00+07:00",
	ticketClosesAt: "2026-11-03T23:59:00+07:00",
	cfpUrl:"https://sessionize.com/aws-community-day-bandung-2026/",
	cfpOpensAt: "2026-09-19T00:00:00+07:00",
	cfpClosesAt: "2026-10-20T23:59:00+07:00",
	volunteerUrl: "https://forms.gle/s42f8C3ZaHz4uMMi9",
	volunteerOpensAt: "2026-09-26T07:00:00+07:00",
	volunteerClosesAt: "2026-10-07T23:59:00+07:00",
};

export const topics = ["Architecture", "DevOps", "Data", "AI/ML", "Security"] as const;

export const formats = ["Keynote", "Tech talk", "Lightning talk", "Workshop", "Fireside"] as const;

export type Session = {
	start: string;
	end: string;
	format: (typeof formats)[number];
	title?: string;
	speaker?: string;
	role?: string;
	topic?: (typeof topics)[number];
	photo?: string;
};

// Speaker slots from the organizer rundown. Leave unconfirmed fields empty;
// the program shows a placeholder for each one.
export const sessions: Session[] = [
	{ start: "09.45", end: "10.00", format: "Keynote" },
	{ start: "10.00", end: "10.30", format: "Tech talk" },
	{ start: "10.30", end: "11.00", format: "Tech talk" },
	{ start: "11.00", end: "11.30", format: "Tech talk" },
	{ start: "11.30", end: "11.50", format: "Fireside" },
	{
		start: "13.00",
		end: "14.30",
		format: "Workshop",
		title: "Modern Workload and Cloud Native Databases on AWS",
		speaker: "Arief Nugraha",
		role: "Sr. Database Solutions Architect, AWS ASEAN",
		topic: "Data",
	},
	{ start: "13.00", end: "14.30", format: "Workshop" },
	{ start: "13.00", end: "14.30", format: "Workshop" },
	{ start: "13.05", end: "13.20", format: "Lightning talk" },
	{ start: "13.20", end: "13.50", format: "Tech talk" },
	{ start: "13.50", end: "14.20", format: "Tech talk" },
	{ start: "14.20", end: "14.40", format: "Fireside" },
	{ start: "14.40", end: "14.55", format: "Lightning talk" },
	{ start: "14.55", end: "15.25", format: "Tech talk" },
	{ start: "15.25", end: "15.55", format: "Tech talk" },
	{ start: "15.55", end: "16.15", format: "Fireside" },
];

export type AgendaItem = {
	start: string;
	end: string;
	title: string;
	note?: string;
	// Venue-wide moments span both the main stage and the classrooms.
	wide?: boolean;
	// Short name for the day overview.
	label?: string;
};

// Non-speaker moments from the organizer rundown.
export const agenda: AgendaItem[] = [
	{ start: "08.00", end: "09.00", title: "Registration", note: "Check in at the lobby", wide: true, label: "Check-in" },
	{ start: "09.00", end: "09.15", title: "Doors open", note: "Find a seat in the main hall", wide: true },
	{ start: "09.15", end: "09.45", title: "Opening", note: "MC welcome, Indonesia Raya, opening remarks" },
	{ start: "11.50", end: "13.00", title: "Lunch & prayer break", note: "Classrooms open right after", wide: true, label: "Lunch" },
	{ start: "13.00", end: "13.05", title: "MC reopening" },
	{ start: "16.15", end: "16.45", title: "Closing", note: "Group photo, door prize, wrap-up" },
];
