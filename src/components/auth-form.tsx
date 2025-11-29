import Link from 'next/link';

type AuthFormProps = {
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  button: React.ReactNode;
  google: React.ReactNode;
  linkText: string;
  href: string;
};

const AuthForm = ({ title, subtitle, fields, linkText, href, button, google }: AuthFormProps) => {
  return (
    <div className='px-8 pt-7 pb-10 mx-auto bg-[#18181b] rounded-2xl shadow-2xl'>
      <h2 className='text-[#ecedee] font-bold text-xl leading-tight mb-7'>{title}</h2>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-3 w-full mb-3'>{fields}</div>
        <div className='w-full'>
          {button}
          <div className='relative w-full py-1'>
            <div className='absolute inset-0 flex items-center'>
              <div className='m-auto w-[95%] border-t border-[#3f3f46]'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-[#18181b] text-[#a1a1aa]'>OR</span>
            </div>
          </div>
          {google}
        </div>
        <span className='text-[#ecedee] font-medium text-sm leading-normal self-center'>
          {subtitle}{' '}
          <Link href={href} className='text-[#006fee] hover:underline'>
            {linkText}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
