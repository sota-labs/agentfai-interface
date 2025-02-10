import { AgentT } from '@/libs/agents/type';
import { AppButton } from '../AppButton';
import AppFallbackImage from '../AppFallbackImage';
import AppModal from '../AppModal';

export const ModalConfirm = ({
  isOpen,
  onClose,
  connectToRaidenx,
  agent,
}: {
  isOpen: boolean;
  onClose: () => void;
  connectToRaidenx: () => void;
  agent: AgentT;
}) => {
  return (
    <AppModal isOpen={isOpen} onClose={onClose}>
      <div id="modal-confirm">
        <div className="max-md:w-[360px] w-[500px] bg-white rounded-3xl shadow-lg px-4 pb-4">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-2xl font-bold max-md:text-xl">
              Welcome to {agent.name}
            </h2>

            <div className="!mt-5 w-[64px] h-[64px] flex items-center justify-center">
              {/* <RaidenxIcon /> */}
              <AppFallbackImage
                src={agent?.logoUrl || ''}
                alt={'logo'}
                width={64}
                height={64}
                className="rounded-[8px]"
              />
            </div>

            <p className="text-center text-gray-600 text-[15px] max-w-md pt-2 pb-4 max-md:text-[14px]">
              Please authenticate and grant permission to continue.
            </p>

            <div className="flex w-full space-x-2">
              <AppButton
                onClick={onClose}
                buttonType="outline"
                className="py-2"
              >
                Cancel
              </AppButton>
              <AppButton buttonType="primary" onClick={connectToRaidenx}>
                <span className="!text-[#000]">Continue</span>
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
};
