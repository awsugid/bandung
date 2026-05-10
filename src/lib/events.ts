import { absoluteUrl, site } from "@/lib/site";

export const meetupGroupUrl = "https://www.meetup.com/aws-user-group-bandung/";

export const events = [
	{
		id: "314688796",
		title: "AWS User Group Bandung Meetup May 2026",
		type: "Meetup",
		phase: "next",
		statusLabel: "Next event",
		dateLabel: "Saturday, May 16, 2026",
		timeLabel: "4:00 PM - 6:00 PM WIB",
		startDate: "2026-05-16T16:00:00+07:00",
		endDate: "2026-05-16T18:00:00+07:00",
		location: "MIRE HUB - Creative Hub & Event Space",
		address:
			"Jl. Brigadir Jend. Katamso No.19B, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122",
		city: "Bandung",
		priceLabel: "Free",
		attendeeCount: 2,
		host: "Arsy Opraza Akma",
		hostDisplayName: "Arsy Opraza A.",
		groupName: "AWS User Group Bandung",
		groupRating: "5.0",
		groupReviewCount: 8,
		imageUrl:
			"https://secure.meetupstatic.com/photos/event/5/2/5/7/highres_534141079.webp?w=3840",
		meetupUrl:
			"https://www.meetup.com/aws-user-group-bandung/events/314688796/?eventOrigin=group_featured_event",
		mapUrl:
			"https://www.google.com/maps/search/?api=1&query=-6.904756%2C%20107.631134",
		coordinates: {
			latitude: -6.904756,
			longitude: 107.631134,
		},
		speakers: [
			{
				name: "Fauzi Kurniawan",
				role: "Code Reviewer & Mentor at Dicoding Indonesia",
				topic:
					"Beyond Just Face Detection: Exploring AWS Rekognition Capabilities.",
			},
		],
		topics: ["AI/ML", "Amazon Web Services", "Cloud Computing"],
		description:
			"Join AWS User Group Bandung for a May meetup on AWS Rekognition, real-world cloud learning, and professional networking with fellow IT practitioners in Bandung.",
		details: [
			"Join us at the AWS User Group Bandung Meetup May 2026.",
			"Learn, share experiences, and expand your professional network with fellow IT practitioners in Bandung.",
			"The speaker will share insights, best practices, and real-world examples for both seasoned AWS users and people who are just starting out.",
			"Use this session to expand your knowledge of cloud technologies and connect with like-minded professionals.",
		],
	},
	{
		id: "313454112",
		title: "Kiro Night AWS User Group Bandung",
		type: "Meetup",
		phase: "past",
		statusLabel: "Past event",
		dateLabel: "Saturday, February 28, 2026",
		timeLabel: "4:00 PM - 6:00 PM WIB",
		startDate: "2026-02-28T16:00:00+07:00",
		endDate: "2026-02-28T18:00:00+07:00",
		location: "MIRE HUB - Creative Hub & Event Space",
		address:
			"Jl. Brigadir Jend. Katamso No.19B, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122",
		city: "Bandung",
		priceLabel: "Free",
		attendeeCount: 12,
		host: "Arsy Opraza Akma",
		hostDisplayName: "Arsy Opraza A.",
		groupName: "AWS User Group Bandung",
		groupRating: "5.0",
		groupReviewCount: 8,
		imageUrl:
			"https://secure.meetupstatic.com/photos/event/7/c/b/a/highres_532831930.jpeg",
		meetupUrl:
			"https://www.meetup.com/aws-user-group-bandung/events/313454112/?eventOrigin=group_past_events",
		mapUrl:
			"https://www.google.com/maps/search/?api=1&query=-6.904756%2C%20107.631134",
		coordinates: {
			latitude: -6.904756,
			longitude: 107.631134,
		},
		speakers: [
			{
				name: "Bervianto Leo Pratama",
				role: "Software Engineer at Mitrais | AWS Community Builder",
				topic: "Kiro for Bandung's cloud computing community.",
			},
		],
		topics: ["AI/ML", "Amazon Web Services", "Cloud Computing"],
		description:
			"A community evening about Kiro, cloud conversations, and local networking with Bandung builders.",
		details: [
			"Kiro Night brought the Bandung cloud community together for an afternoon of AWS discussion and networking.",
			"The session introduced Kiro through a practical community lens, with room for questions and peer conversation.",
			"The meetup included iftar for registered participants.",
		],
	},
	{
		id: "312252052",
		title: "AWS User Group Bandung Meetup December 2025",
		type: "Meetup",
		phase: "past",
		statusLabel: "Past event",
		dateLabel: "Monday, December 22, 2025",
		timeLabel: "6:30 PM - 8:30 PM WIB",
		startDate: "2025-12-22T18:30:00+07:00",
		endDate: "2025-12-22T20:30:00+07:00",
		location: "BLOCK71 Bandung",
		address: "Innovation Factory, Jl. Ir. H. Djuanda No.108, Lebakgede",
		city: "Bandung",
		priceLabel: "Free",
		attendeeCount: 51,
		host: "Arsy Opraza Akma",
		hostDisplayName: "Arsy Opraza A.",
		groupName: "AWS User Group Bandung",
		groupRating: "5.0",
		groupReviewCount: 8,
		imageUrl:
			"https://secure.meetupstatic.com/photos/event/7/6/5/1/highres_531690289.jpeg",
		meetupUrl:
			"https://www.meetup.com/aws-user-group-bandung/events/312252052/?eventOrigin=group_past_events",
		mapUrl:
			"https://www.google.com/maps/search/?api=1&query=-6.892489%2C%20107.61342",
		coordinates: {
			latitude: -6.892489,
			longitude: 107.61342,
		},
		speakers: [
			{
				name: "Donnie Prakoso",
				role: "Principal Developer Advocate at Amazon Web Services",
				topic: "Strands AI Pattern.",
			},
			{
				name: "Petra Barus",
				role: "Community speaker",
				topic: "Spec Driven Development with Kiro.",
			},
		],
		topics: ["AI/ML", "Amazon Web Services", "Cloud Computing"],
		description:
			"A year-end meetup with deep dives into Strands AI Pattern, Kiro, AWS practice, and community networking.",
		details: [
			"The December meetup closed the year with focused sessions on newer cloud development patterns.",
			"Speakers covered Strands AI Pattern and Spec Driven Development with Kiro.",
			"The session was built for both experienced AWS users and people starting their cloud learning path.",
		],
	},
];

export const nextEvents = events.filter((event) => event.phase === "next");
export const currentEvents = events.filter((event) => event.phase === "current");
export const pastEvents = events.filter((event) => event.phase === "past");
export const featuredEvent = nextEvents[0] ?? events[0];

export type CommunityEvent = (typeof events)[number];

export const getEventJsonLd = (event: CommunityEvent) => ({
	"@context": "https://schema.org",
	"@type": "Event",
	name: event.title,
	description: event.description,
	startDate: event.startDate,
	endDate: event.endDate,
	eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
	eventStatus:
		event.phase === "past"
			? "https://schema.org/EventCompleted"
			: "https://schema.org/EventScheduled",
	image: [event.imageUrl],
	url: event.meetupUrl,
	isAccessibleForFree: event.priceLabel === "Free",
	location: {
		"@type": "Place",
		name: event.location,
		address: {
			"@type": "PostalAddress",
			streetAddress: event.address,
			addressLocality: event.city,
			addressRegion: "West Java",
			addressCountry: "ID",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: event.coordinates.latitude,
			longitude: event.coordinates.longitude,
		},
	},
	organizer: {
		"@type": "Organization",
		name: site.name,
		url: absoluteUrl("/"),
	},
	performer: event.speakers.map((speaker) => ({
		"@type": "Person",
		name: speaker.name,
		jobTitle: speaker.role,
		description: speaker.topic,
	})),
});
