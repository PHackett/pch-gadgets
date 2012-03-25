
public class Overs
{
	int	mOvers;
	int	mBalls;
	
	public Overs()
	{
		mOvers = 0;
		mBalls = 0;
	}
	
	public Overs (String aOS)
	{
		int lIN = aOS.indexOf('.');
		
		// System.out.println ("  DEBUG: Overs " + aOS + " : lIN=" + lIN);
		
		if (-1 == lIN)
		{
			// No '.'
			mOvers = Integer.parseInt (aOS);
			mBalls = 0;
		}
		else
		{
			String lA[] = aOS.split("\\.");

			if (0 == lIN)
			{
				mOvers = 0;
			}
			else
			{
				mOvers = Integer.parseInt (lA[0]);
			}
			
			mBalls = Integer.parseInt (lA[1]);
		}
	}
	
	
	public Overs (int aOvers, int aBalls)
	{
		mOvers = aOvers;
		mBalls = aBalls;
		
		if (mBalls > 5)
		{
			System.out.println ("ERROR: number of balls in over (" + mBalls + ") too big!");
			mBalls = 5;
		}
	}
	
	public void add (Overs aOvers)
	{
		mOvers += aOvers.getOvers();
		mBalls += aOvers.getBalls();
		
		if (mBalls > 5)
		{
			mBalls -= 6;
			mOvers += 1;
		}
	}
	
	public int getOvers()	{ return (mOvers);					}
	public int getBalls()	{ return (mBalls);					}
	public int totalBalls()	{ return ((mOvers * 6) + mBalls);	}
	
	public String toString()
	{
		String lRet ="" + mOvers + "." + mBalls;
		
		return (lRet);
	}
}
