
public class BowlingMatchData
{
	MatchID		mMatchID;
	BowlerStats	mBowlerStats;
	
	public BowlingMatchData (MatchID aMatchID, BowlerStats	aBowlerStats)
	{
		mMatchID		= aMatchID;
		mBowlerStats	= aBowlerStats;
	}

	public MatchID		MatchID()		{ return (mMatchID);		}
	public BowlerStats	BowlerStats()	{ return (mBowlerStats);	}
}
