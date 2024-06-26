package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Booking struct{
	ID			primitive.ObjectID	`bson:"_id"`
	UserID		primitive.ObjectID	`json:"user_id"`
	EventID		primitive.ObjectID	`json:"event_id"`
	TotalTicket *int				`json:"total_ticket"`
	BookingDate time.Time				`json:"booking_date"`
	Tickets 	[]BookingTicket			`json:"tickets"`
	TotalPrice  float64			`json:"total_price"`
}