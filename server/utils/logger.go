package utils

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var Log *zap.SugaredLogger

func InitLogger() {
	config := zap.NewDevelopmentConfig()
	logger, err := config.Build(zap.Hooks(func(entry zapcore.Entry) error {
		if entry.Level >= zapcore.ErrorLevel {
			AddErrorLog(entry.Message)
		}
		return nil
	}))
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
