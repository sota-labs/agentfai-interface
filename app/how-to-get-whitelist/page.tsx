import Image from 'next/image';
import Link from 'next/link';

const BlogDetails = () => {
  return (
    <div className="md:px-10 px-4 pt-5 pb-20 text-white-600 !font-[400] leading-[1.5]">
      <div className="pb-7 border-b border-white-50 !font-[400]">
        <Link href="/">
          <div className="px-2.5 py-2 mb-4 border border-white-100 rounded-[6px] bg-white-50 cursor-pointer w-max">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2917 10C17.2917 10.3452 17.0119 10.625 16.6667 10.625L4.79169 10.625L9.34149 15.4023C9.57955 15.6523 9.5699 16.0479 9.31994 16.2859C9.06999 16.524 8.67438 16.5143 8.43632 16.2644L2.88077 10.4311C2.65088 10.1897 2.65088 9.81037 2.88077 9.56899L8.43632 3.73565C8.67438 3.4857 9.06999 3.47605 9.31994 3.7141C9.5699 3.95216 9.57955 4.34777 9.3415 4.59772L4.79169 9.37502L16.6667 9.37502C17.0119 9.37502 17.2917 9.65484 17.2917 10Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>

        <div className="max-w-[900px] mx-auto">
          <div className="text-[30px] font-[600] mb-3 text-white-1000">
            How to Get a Whitelist for a DAO on Suidaos.com
          </div>
          <div className="!font-[400]">
            The launch of Suidaos.com and the first DAO token - $SHR0, reaching
            an ATH of $16.7M in less than 24 hours has been warmly welcomed by
            Sui traders and Sui community. As you know, many more highly
            promising DAO projects are set to launch on Suidaos.com in the near
            future. Here are the ways you can get a whitelist spot for these
            exciting projects:
          </div>
          <div>
            <div className="heading-xlg-semibold-32 mt-3 font-bold text-white-1000">
              1. Support Suidaos.com and DAO Projects
            </div>

            <div className="!font-[400]">
              Another way to get a chance to have a whitelist spot is by
              actively supporting Suidaos.com and the DAO projects. First of
              all, make sure that you:
            </div>

            <div className="text-white-600 ml-4">
              <div className="text-white-1000">1. Follow Our Social Media:</div>
              <div>X (Twitter) accounts:</div>
              <div className="!font-[400]">
                -{' '}
                <a
                  href="https://x.com/suidaosdotcom"
                  target="_blank"
                  className="underline"
                >
                  @suidaosdotcom
                </a>{' '}
                verified with gold tick
              </div>
              <div>
                -{' '}
                <a
                  href="https://raidenx.io"
                  target="_blank"
                  className="underline"
                >
                  @raidenx_io
                </a>{' '}
              </div>

              <div className="!font-[400]">
                -{' '}
                <span>
                  <a
                    href="https://x.com/SroomAiDao"
                    target="_blank"
                    className="underline"
                  >
                    X account
                  </a>
                </span>{' '}
                of DAO project
              </div>
            </div>

            <div className="text-white-600 ml-4">
              <div className="text-white-1000">2. Join Our Communities:</div>

              <div className="!font-[400]">
                - Telegram Announcement Channel:{' '}
                <a
                  href="https://t.me/suidaos_announcement"
                  target="_blank"
                  className="underline"
                >
                  @suidaos_announcement
                </a>{' '}
              </div>
              <div className="!font-[400]">
                - Telegram Community:{' '}
                <a
                  href="https://t.me/suidaos"
                  target="_blank"
                  className="underline"
                >
                  https://t.me/suidaos
                </a>
              </div>
            </div>
            <div className="!font-[400]">
              Ensure you stay updated with the latest announcements.
            </div>

            <div className="text-white-600 ml-4">
              <div className="text-white-1000">3. Create Creative Content:</div>

              <div className="!font-[400]">
                You can create creative content (images, videos, GIFs, etc.) and
                post it on X about the DAO project. This could include designing
                stickers, making videos featuring project characters, or writing
                posts to share information about the projects and Suidaos.com
              </div>
            </div>

            <div className="my-7">
              <Image
                src={'/blog/stickers.png'}
                alt="blog-1"
                className="w-full h-auto aspect-[708/292] object-cover"
                width={708}
                height={292}
              />
            </div>

            <div className="text-white-600 mb-3 !font-[400]">
              Don’t forget to tag @suidaosdotcom, @raidenx_io and the DAO
              project on X to get noticed and potentially selected for whitelist
              allocation.
            </div>
            <div className="text-white-600 mb-3 !font-[400]">
              Exclusive Support: Focus solely on supporting Suidaos.com and its
              DAO projects. Show unwavering support, and you may increase your
              chance to be chosen for whitelist allocation.
            </div>
          </div>
          <div>
            <div className="heading-xlg-semibold-32 mt-3 font-bold text-white-1000">
              2. Stake $SHR0
            </div>
            <div className="!font-[400]">
              Other way to become eligible for a Whitelist spot is by staking
              $SHR0. Generally, the more $SHR0 you stake, the higher your
              chances of being allocated a whitelist spot. Below are the details
              about staking tiers and the corresponding whitelist opportunities:
            </div>

            <div className="my-7">
              <Image
                src={'/blog/Staking_tier.png'}
                alt="blog-1"
                className="w-full h-auto aspect-[298/167] object-cover"
                width={298}
                height={167}
              />
            </div>

            <div className="font-[500]">- Staking Tiers and Opportunities:</div>
            <div className="ml-4 !font-[400]">
              <span className="font-[500]">+ Bronze to Gold Ranks: </span>
              After meeting the requirements, Suidaos.com and the respective DAO
              project will randomly select users for Whitelist allocation.
            </div>
            <div className="ml-4 !font-[400]">
              <span className="font-[500]">+ Diamond Rank: </span>
              The TOP 10 Gold Stakers are guaranteed VIP allocation.
            </div>
            <div className="!font-[400]">
              <span className="font-[500]">- Max Allocation: </span>
              The maximum allocation per tier you can get depends on the actual
              DAO.
            </div>

            <div className="!font-[400]">
              <span className="font-[500]">- Withdraw Delay: </span>
              You can claim the token to your wallet after a withdrawal delay
              days. For example, if the withdrawal delay is 5 days and you
              initiate a withdrawal on Jan 1, 2025, you can claim it back on Jan
              6 2025.
            </div>

            <div className="!font-[400]">
              <span className="font-[500]">- VIP Only Pools: </span>
              Exclusive pools will be available for only VIP participants.
            </div>

            <div className="font-[500]">Snapshot:</div>

            <div className="ml-4 !font-[400]">
              - 24 hours before whitelist allocation, Suidaos.com will take a
              snapshot of the staking rankings.
            </div>

            <div className="ml-4 !font-[400]">
              - Stakers must maintain their staking rank to avoid unexpected
              issues.
            </div>
          </div>

          <div>
            <div className="heading-xlg-semibold-32 mt-3 font-bold text-white-1000">
              3. Become a Top Volume Trader on RaidenX
            </div>
            <div className="!font-[400]">
              Before the official launch of a new DAO, 24 hours prior, RaidenX
              will take a snapshot and announce the Top 3 trading volumes over
              the past 7 days. Whitelist allocation decreases based on trading
              volume rank.
            </div>
            <div className="!font-[400]">
              <span className="font-[500]">Note: </span>
              Top trading volume users must achieve a minimum of $100,000
              trading volume to qualify for whitelist allocation
            </div>

            <div className="my-7">
              <Image
                src={'/blog/Top_trading_volume.png'}
                alt="blog-1"
                className="w-full h-auto aspect-[298/167] object-cover"
                width={298}
                height={167}
              />
            </div>

            <div className="font-[600] my-3 text-white-1000">About SuiDaos</div>

            <div className="!font-[400]">
              Suidaos.com is a decentralized launchpad platform built on the Sui
              blockchain, allowing reputable and trustful fund managers to
              create and manage Decentralized Autonomous Organizations (DAOs)
              for fundraising. Developed by RaidenX, we position ourselves as a
              premier hedge fund manager within the Sui ecosystem.
            </div>

            <div className="!font-[400]">
              Suidaos provides a reputable and high-quality space for DAO
              creators to set fundraising targets and launch DAO tokens. These
              DAOs are designed to pool resources for trading AI and potential
              projects on Sui. Explore Suidao.com now at{' '}
              <a
                href="https://suidaos.com/"
                className="underline"
                target="_blank"
              >
                https://suidaos.com/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
