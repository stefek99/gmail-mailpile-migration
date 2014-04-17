counter = 1;

# def parse_message(message)
define_method :parse_message do |message|
	filename = counter.to_s.rjust(7, '0');
	File.open("mail/" + filename, 'w') do |file| 
	  file.write(message)
	end

	counter = counter + 1;

	if counter % 100 == 0 then
		puts "File #{filename}"
	end
end

message = nil

File.open("all.mbox", "r") do |f|
  f.each_line do |line|
  	# puts line
	if (line.match(/\AFrom /))
	  parse_message(message) if (message)
	  message = ''
	  message << line
	else
	  message << line.sub(/^\>From/, 'From')
	end
  end
end