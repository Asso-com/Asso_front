import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  Icon,
  Text,
  Divider,
} from "@chakra-ui/react"
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaCalendarCheck,
  FaDollarSign,
  FaUsers,
  FaBookOpen,
  FaRegSmile,
} from "react-icons/fa"
import Chart from "react-apexcharts"
import { useState, useEffect } from "react"

type MetricCardProps = {
  label: string
  value: string
  icon: any
  color: string
  increase?: string
  decrease?: string
}

type ChartCardProps = {
  title: string
  options: any
  series: any
  type: "bar" | "line" | "area" | "pie" | "radialBar"
}

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Charts data for "Renforcement Scolaire"
  const progressOptions = {
    chart: { id: "progress-trend", toolbar: { show: false } },
    xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"] },
    colors: ["#38A169"],
    stroke: { curve: "smooth" },
  }
  const progressSeries = [{ name: "Avg. Score (%)", data: [55, 62, 68, 74] }]

  const sessionAttendanceOptions = {
    chart: { id: "attendance", toolbar: { show: false } },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    colors: ["#3182CE"],
  }
  const sessionAttendanceSeries = [
    { name: "Attendance", data: [22, 20, 18, 25, 24] },
  ]

  const subjectDistributionOptions = {
    labels: ["Math", "Science", "Languages", "Other"],
    colors: ["#805AD5", "#48BB78", "#F6AD55", "#E53E3E"],
    legend: { position: "bottom" },
  }
  const subjectDistributionSeries = [40, 30, 20, 10]

  const satisfactionOptions = {
    chart: { id: "satisfaction", toolbar: { show: false } },
    xaxis: {
      categories: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"],
    },
    colors: ["#D69E2E"],
  }
  const satisfactionSeries = [
    { name: "Parent Feedback", data: [35, 45, 10, 5] },
  ]

  return (
    <Box p={4} bg="white" minH="100%" borderRadius="xl">
      <Box
        bgGradient="linear(to-r, blue.400, purple.600)"
        p={{ base: 4, md: 8 }}
        rounded="2xl"
        shadow="xl"
        mb={4}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="whiteAlpha.200"
          bgImage="radial-gradient(circle at top left, whiteAlpha.300, transparent)"
          opacity={0.3}
        />
        <Flex direction="column" align="center" position="relative" zIndex={1}>
          <Heading
            mb={2}
            textAlign="center"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="white"
          >
            Asso comm Dashboard
          </Heading>
          <Text
            textAlign="center"
            fontSize={{ base: "sm", md: "md" }}
            color="whiteAlpha.800"
            maxW="600px"
          >
            Monitor tutoring programs, student progress, session data, and
            parental satisfaction in real-time.
          </Text>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={10}>
        <MetricCard
          label="Students in Remedial Program"
          value="120"
          icon={FaUserGraduate}
          color="blue.500"
          increase="8%"
        />
        <MetricCard
          label="Tutors Assigned"
          value="20"
          icon={FaChalkboardTeacher}
          color="green.500"
        />
        <MetricCard
          label="Sessions This Month"
          value="75"
          icon={FaClipboardCheck}
          color="purple.500"
          increase="15%"
        />
        <MetricCard
          label="Avg. Attendance Rate"
          value="88%"
          icon={FaCalendarCheck}
          color="cyan.500"
          decrease="2%"
        />
        <MetricCard
          label="Budget Allocated"
          value="$18,000"
          icon={FaDollarSign}
          color="teal.500"
        />
        <MetricCard
          label="Budget Used"
          value="$13,500"
          icon={FaBookOpen}
          color="red.500"
        />
        <MetricCard
          label="Parent Satisfaction"
          value="80%"
          icon={FaRegSmile}
          color="orange.500"
          increase="5%"
        />
        <MetricCard
          label="Support Staff"
          value="10"
          icon={FaUsers}
          color="pink.500"
        />
      </SimpleGrid>

      <Divider mb={8} />

      {/* Charts Section */}
      {isMounted && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <ChartCard
            title="Student Progress Over Weeks"
            options={progressOptions}
            series={progressSeries}
            type="line"
          />
          <ChartCard
            title="Weekly Session Attendance"
            options={sessionAttendanceOptions}
            series={sessionAttendanceSeries}
            type="bar"
          />
          <ChartCard
            title="Subjects in Focus"
            options={subjectDistributionOptions}
            series={subjectDistributionSeries}
            type="pie"
          />
          <ChartCard
            title="Parent Satisfaction Feedback"
            options={satisfactionOptions}
            series={satisfactionSeries}
            type="bar"
          />
        </SimpleGrid>
      )}
    </Box>
  )
}

const MetricCard = ({
  label,
  value,
  icon,
  color,
  increase,
  decrease,
}: MetricCardProps) => (
  <Stat
    p={4}
    bg="white"
    rounded="xl"
    shadow="lg"
    borderLeft="6px solid"
    borderColor={color}
  >
    <Flex align="center">
      <Box p={2} rounded="full" bg={`${color}20`} mr={4}>
        <Icon as={icon} boxSize={7} color={color} />
      </Box>
      <Box>
        <StatLabel fontWeight="bold">{label}</StatLabel>
        <StatNumber fontSize="lg">{value}</StatNumber>
        {(increase || decrease) && (
          <StatHelpText>
            <StatArrow type={increase ? "increase" : "decrease"} />
            {increase || decrease}
          </StatHelpText>
        )}
      </Box>
    </Flex>
  </Stat>
)

const ChartCard = ({ title, options, series, type }: ChartCardProps) => (
  <Box bg="white" p={4} rounded="xl" shadow="lg">
    <Heading size="md" mb={4} color="gray.700">
      {title}
    </Heading>
    <Chart
      options={options}
      series={series}
      type={type}
      height={300}
      width="100%"
    />
  </Box>
)

export default Dashboard
