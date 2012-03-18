
public class BattingMatchData
{
	MatchID				mMatchID;
	BatterGameSummary	mGameData;
	
	public BattingMatchData (MatchID aMatchID, BatterGameSummary aGameData)
	{
		mMatchID	= aMatchID;
		mGameData	= aGameData;		
	}

	public MatchID				MatchID()	{ return (mMatchID);		}
	public BatterGameSummary	GetBGS()	{ return (mGameData);		}		
}
