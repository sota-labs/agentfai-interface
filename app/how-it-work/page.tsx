'use client';

const HowItWork = () => {
  return (
    <div className="max-w-2xl px-4 py-8 mx-auto">
      <h1 className="text-[36px] font-semibold text-white-0 mb-6">
        How it work
      </h1>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Fundraising</h3>
        <p className="text-white-500 mb-2">
          Creators have 7 days to reach their target SUI amount. This process
          serves as a fair launch for the DAO token, ensuring all participants
          acquire tokens at the same price.
        </p>
        <p className="text-white-500">
          Creators determine who can participate in the Pool Party Round, with
          invites potentially shared via their Telegram, X (formerly Twitter),
          or other community platforms.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          2. Trading (When fundraising succeeds)
        </h3>
        <p className="text-white-500 mb-2">
          After the fundraising period, creators allocate 90.9% of the raised
          SUI to invest in their chosen Sui protocols. The remaining 9.1% is
          used to launch the DAO token on an AMM, where its price varies based
          on trading activity. Once launched, you’re free to sell your DAO
          tokens at any time.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. Fund Expiration</h3>
        <p className="text-white-500 mb-2">
          At the fund’s expiration, the DAO wallet is frozen, and any profits in
          SUI are distributed among token holders. You can choose to burn your
          DAO tokens to claim the underlying assets or trade them on the curve
          at any time.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          4. What is carried interest?
        </h3>
        <p className="text-white-500 mb-2">
          Carried interest refers to the share of the fund’s profits allocated
          to the DAO creator after the fund expires (typically one year). The
          creator only earns carried interest if the fund achieves its minimum
          return, known as the hurdle rate, within that timeframe.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          5. Can I sell the DAO token anytime?
        </h3>
        <p className="text-white-500 mb-2">
          Yes, as long as the DAO token&apos;s market cap exceeds the initial
          fundraising amount.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          6. What happens if the creator doesn’t meet the fundraising goal in a
          week?
        </h3>
        <p className="text-white-500 mb-2">
          If the fundraising goal isn’t met, you can redeem your SUI investment
          in full.
        </p>
      </div>

      {/* <h2 className="text-[36px] font-semibold text-white-0 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 mb-10">
        {QUESTIONS.map((item, index) => (
          <AppCollapse key={index} title={`${index + 1}. ${item?.question}`}>
            {item?.answer}
          </AppCollapse>
        ))}
      </div> */}
    </div>
  );
};

export default HowItWork;
