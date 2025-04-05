package types

// User defines the structure for a user.
type Discount struct {
	Id int `json:"id"`
	Code  string    `json:"code"`
	Description string `json:"description"`
	DiscountPercentage int `json:"discountPercentage"`
}