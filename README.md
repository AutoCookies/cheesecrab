# Cheese Crab

Unified edge AI inference engine: local AI as lightweight as a crab eating the cheese.

**Phase 1** (current): Monorepo foundation with vendored cores (palloc, contextsqueezer, pomaicache, pomaidb, cheesebrain) and a single pipeline: **compress context → prefix cache → bounded alloc → infer → store embeddings**. Build with CMake; optional components via `CHEESECRAB_BUILD_*`. No CLI/server yet.

<img src="./media/cheesecrab0.png"/>
