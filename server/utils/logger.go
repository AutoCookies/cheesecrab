package utils

import (
	"go.uber.org/zap"
)

var Log *zap.SugaredLogger

func InitLogger() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}
	Log = logger.Sugar()
}

func SyncLogger() {
	if Log != nil {
		Log.Sync()
	}
}
