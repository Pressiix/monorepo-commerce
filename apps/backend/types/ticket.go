package types

type Ticket struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Img   string `json:"img"`
	Price int    `json:"price"`
}