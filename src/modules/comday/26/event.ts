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

export type Session = {
	time: string;
	room: "Main stage" | "Workshop";
	title: string;
	speaker: string;
	role: string;
	topic: (typeof topics)[number];
	photo?: string;
};

// Leave empty until the lineup is confirmed; the program shows placeholders.
export const sessions: Session[] = [];
