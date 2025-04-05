package services

import (
	"encoding/json"
	"errors"
	"go-api/types"
	"os"
	"sync"
)

var (
	ticketsCache   []types.Ticket
	discountsCache map[string]types.Discount
	cacheMutex     sync.Mutex
)

const (
	cacheTicketsFilePath   = "./data/tickets.json"
	cacheDiscountsFilePath = "./data/discounts.json"
)

// InitializeCache loads tickets and discounts into memory from JSON files
func InitializeCache() error {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()

	// Load tickets into cache
	ticketsFile, err := os.Open(cacheTicketsFilePath)
	if (err != nil) {
		return err
	}
	defer ticketsFile.Close()

	var tickets []types.Ticket
	if err := json.NewDecoder(ticketsFile).Decode(&tickets); err != nil {
		return err
	}
	ticketsCache = tickets

	// Load discounts into cache
	discountsFile, err := os.Open(cacheDiscountsFilePath)
	if err != nil {
		return err
	}
	defer discountsFile.Close()

	var discounts []types.Discount
	if err := json.NewDecoder(discountsFile).Decode(&discounts); err != nil {
		return err
	}

	discountsCache = make(map[string]types.Discount)
	for _, discount := range discounts {
		discountsCache[discount.Code] = discount
	}

	return nil
}

func GetAllTicketsFromCache() ([]types.Ticket, error) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()

	if len(ticketsCache) == 0 {
		return nil, errors.New("tickets cache is empty")
	}
	return ticketsCache, nil
}

func GetDiscountByCodeFromCache(code string) (types.Discount, error) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()

	discount, exists := discountsCache[code]
	if !exists {
		return types.Discount{}, errors.New("discount not found in cache")
	}
	return discount, nil
}
