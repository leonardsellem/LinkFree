import Link from "next/link";
import Alert from "../Alert";
import FallbackImage from "../FallbackImage";

export default function UserTestimonials({ users, data, BASE_URL }) {
  const fallbackImageSize = 120;
  const testimonials =
    data.testimonials &&
    data.testimonials.map((testimonial) => {
      const user = users.find((u) => u === testimonial.username);

      if (user) {
        return {
          ...testimonial,
          url: `${BASE_URL}/${testimonial.username}`,
        };
      }
      return {
        ...testimonial,
        url: `https://github.com/${testimonial.username}`,
      };
    });
  return (
    <>
      {!data.testimonials && (
        <Alert type="info" message="No testimonials found" />
      )}
      {data.testimonials &&
        testimonials.map((testimonial, key) => (
          <div
            className="flex text-sm text-gray-500 border-2 my-4 px-4 rounded-xl shadow-xl"
            key={key}
          >
            <div className="flex-none p-6">
              <Link href={testimonial.url} target="_blank" rel="noreferrer">
                <FallbackImage
                  src={`https://github.com/${testimonial.username}.png`}
                  alt={`Profile picture of ${testimonial.username}`}
                  width={fallbackImageSize}
                  height={fallbackImageSize}
                  fallback={testimonial.name}
                  className="h-20 w-20 rounded-full bg-gray-100"
                />
              </Link>
            </div>
            <div className="flex-1 p-6">
              <h3 className="font-medium text-gray-900">{testimonial.title}</h3>
              <Link href={testimonial.url} target="_blank" rel="noreferrer">
                {testimonial.username}
              </Link>

              <div className="prose prose-sm mt-4 max-w-none text-gray-500">
                <p>{testimonial.description}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
